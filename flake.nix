{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    android-nixpkgs = {
      url = "github:tadfisher/android-nixpkgs";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      nixpkgs,
      android-nixpkgs,
      ...
    }:
    let
      systems = [
        "x86_64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      forAllSystems = nixpkgs.lib.genAttrs systems;

      androidNdkVersion = "27.1.12297006";

      pkgsFor =
        system:
        import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
            android_sdk.accept_license = true;
          };
        };

      androidSdkFor =
        system:
        android-nixpkgs.sdk.${system} (
          sdkPkgs: with sdkPkgs; [
            cmdline-tools-latest
            build-tools-35-0-0
            build-tools-36-0-0
            platform-tools
            platforms-android-35
            platforms-android-36
            ndk-27-1-12297006
            cmake-3-22-1
          ]
        );

      xcodeWrapperFor =
        pkgs:
        pkgs.stdenv.mkDerivation {
          name = "xcode-wrapper";
          buildInputs = [ pkgs.darwin.cctools ];
          buildCommand = ''
            mkdir -p "$out/bin"

            cat > "$out/bin/xcodebuild" <<'EOF'
            #!/bin/sh
            exec /usr/bin/xcodebuild "$@"
            EOF

            cat > "$out/bin/xcrun" <<'EOF'
            #!/bin/sh
            exec /usr/bin/xcrun "$@"
            EOF

            cat > "$out/bin/xcode-select" <<'EOF'
            #!/bin/sh
            if [ "$1" = "-p" ] && [ -n "$DEVELOPER_DIR" ]; then
              echo "$DEVELOPER_DIR"
            else
              exec /usr/bin/xcode-select "$@"
            fi
            EOF

            cat > "$out/bin/codesign" <<'EOF'
            #!/bin/sh
            exec /usr/bin/codesign "$@"
            EOF

            cat > "$out/bin/ld" <<'EOF'
            #!/bin/sh
            exec /usr/bin/ld "$@"
            EOF

            cat > "$out/bin/clang" <<'EOF'
            #!/bin/sh
            exec /usr/bin/clang "$@"
            EOF

            chmod +x "$out/bin/"*

            if [ -d "/Applications/Xcode.app" ]; then
              DEVELOPER_DIR="/Applications/Xcode.app/Contents/Developer"
            else
              DEVELOPER_DIR="$(/usr/bin/xcode-select -p 2>/dev/null || true)"
            fi

            if [ -z "$DEVELOPER_DIR" ]; then
              echo "Xcode not found" >&2
              exit 1
            fi

            cat > "$out/bin/env.sh" <<EOF
            export DEVELOPER_DIR="$DEVELOPER_DIR"
            EOF
          '';
        };

      mkCiShell =
        system:
        let
          pkgs = pkgsFor system;
          isLinux = pkgs.stdenv.isLinux;
          isDarwin = pkgs.stdenv.isDarwin;
          androidSdk = if isLinux then androidSdkFor system else null;
          xcodeWrapper = if isDarwin then xcodeWrapperFor pkgs else null;
          commonPackages = with pkgs; [
            nodejs_24
            bun
            go
            protobuf
            clang-tools
            jdk17
            gnumake
            perl
            zip
            unzip
            git
          ];
          linuxPackages =
            if isLinux then
              [
                androidSdk
                pkgs.pkgsCross.mingwW64.stdenv.cc
              ]
            else
              [ ];
          darwinPackages =
            if isDarwin then
              with pkgs;
              [
                bundler
                cocoapods
              ]
            else
              [ ];
          commonHook = ''
            export LC_ALL=en_US.UTF-8
            export LANG=en_US.UTF-8
            export JAVA_HOME="${pkgs.jdk17.home}"

            cache_root="''${RUNNER_TEMP:-$PWD/.cache}"
            export GOPATH="$cache_root/go"
            export GOBIN="$GOPATH/bin"
            export GOCACHE="$cache_root/gocache"
            export GOMODCACHE="$GOPATH/pkg/mod"

            mkdir -p "$GOBIN" "$GOCACHE" "$GOMODCACHE"
            export PATH="$GOBIN:$PATH"
          '';
          linuxHook =
            if isLinux then
              let
                androidSdkRoot = "${androidSdk}/share/android-sdk";
              in
              ''
                if [ -d "${androidSdkRoot}" ]; then
                  export ANDROID_HOME="${androidSdkRoot}"
                else
                  export ANDROID_HOME="${androidSdk}"
                fi

                export ANDROID_SDK_ROOT="$ANDROID_HOME"

                if [ -d "$ANDROID_HOME/ndk/${androidNdkVersion}" ]; then
                  export ANDROID_NDK_ROOT="$ANDROID_HOME/ndk/${androidNdkVersion}"
                  export ANDROID_NDK_HOME="$ANDROID_NDK_ROOT"
                fi
              ''
            else
              "";
          darwinHook =
            if isDarwin then
              ''
                unset SDKROOT

                if [ -f "${xcodeWrapper}/bin/env.sh" ]; then
                  . "${xcodeWrapper}/bin/env.sh"
                fi

                export CC=/usr/bin/clang
                export CXX=/usr/bin/clang++
                export LD=/usr/bin/clang
                export LD_FOR_TARGET=/usr/bin/clang
              ''
            else
              "";
        in
        pkgs.mkShell {
          packages = commonPackages ++ linuxPackages ++ darwinPackages;
          shellHook = commonHook + linuxHook + darwinHook;
        };
    in
    {
      devShells = forAllSystems (system: {
        default = mkCiShell system;
        ci = mkCiShell system;
      });
    };
}
