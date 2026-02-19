#!/bin/sh

echo "[protoc-generator] Generating C++ and Typescript bindings based on lnd proto files"

# Detect the environment
if [[ "$(uname)" == "MINGW"* ]] || [[ -n "$MSYSTEM" ]]; then
    # Windows MINGW or MSYS2 environment
    PROTOC_PLUGIN=".\\windows-wrapper.bat"
else
    # Unix-like environment
    PROTOC_PLUGIN="./protoc-gen-cpp-functions.ts"
fi

protoc --plugin=protoc-gen-custom="$PROTOC_PLUGIN" \
--custom_out=./build \
--proto_path=../proto \
lightning.proto walletunlocker.proto stateservice.proto autopilotrpc/autopilot.proto chainrpc/chainnotifier.proto invoicesrpc/invoices.proto neutrinorpc/neutrino.proto peersrpc/peers.proto routerrpc/router.proto signrpc/signer.proto verrpc/verrpc.proto walletrpc/walletkit.proto watchtowerrpc/watchtower.proto wtclientrpc/wtclient.proto

echo "[protoc-generator] C++ and Typescript bindings generated"

echo "[protoc-generator] Generating Typescript proto bindings for lnd by protobuf-es"

bunx @bufbuild/buf generate

echo "[protoc-generator] Merging rpcs"

deno run --allow-read --allow-write merge-proto-files.ts

echo "[protoc-generator] Merged"

echo "[protoc-generator] Copying files to cpp and src folders"

mkdir -p ../src/core

cp \
  ./build/TurboLndModule.h ../cpp/TurboLndModule.h && \
cp \
  ./build/TurboLndModule.cpp ../cpp/TurboLndModule.cpp && \
cp \
  ./build/index.ts ../src/index.ts && \
cp \
  ./build/core/NativeTurboLnd.ts ../src/core/NativeTurboLnd.ts && \
cp -r \
  ./build/proto ../src/

echo "[protoc-generator] Done"
