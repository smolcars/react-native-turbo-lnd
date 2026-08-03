#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

echo "[protoc-generator] Generating C++ and Typescript bindings based on lnd proto files"

# Native Windows protoc needs native paths and a batch wrapper. Convert the
# paths explicitly so generation also works when MSYS argument conversion is
# disabled by MSYS2_ARG_CONV_EXCL or MSYS_NO_PATHCONV.
case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*)
        PROTOC_PLUGIN=$(cygpath -w "$SCRIPT_DIR/windows-wrapper.bat")
        CUSTOM_OUT=$(cygpath -w "$SCRIPT_DIR/build")
        PROTO_PATH=$(cygpath -w "$SCRIPT_DIR/../proto")
        ;;
    *)
        PROTOC_PLUGIN="$SCRIPT_DIR/protoc-gen-cpp-functions.ts"
        CUSTOM_OUT="./build"
        PROTO_PATH="../proto"
        ;;
esac

rm -rf ./build
mkdir -p ./build

protoc --plugin=protoc-gen-custom="$PROTOC_PLUGIN" \
--custom_out="$CUSTOM_OUT" \
--proto_path="$PROTO_PATH" \
lightning.proto walletunlocker.proto stateservice.proto autopilotrpc/autopilot.proto chainrpc/chainnotifier.proto invoicesrpc/invoices.proto neutrinorpc/neutrino.proto peersrpc/peers.proto routerrpc/router.proto signrpc/signer.proto verrpc/verrpc.proto walletrpc/walletkit.proto watchtowerrpc/watchtower.proto wtclientrpc/wtclient.proto

echo "[protoc-generator] C++ and Typescript bindings generated"

echo "[protoc-generator] Generating Typescript proto bindings for lnd by protobuf-es"

bunx @bufbuild/buf generate

echo "[protoc-generator] Merging rpcs"

bun merge-proto-files.ts

echo "[protoc-generator] Merged"

echo "[protoc-generator] Copying files to cpp and src folders"

mkdir -p ../src/core
mkdir -p ../src/electrobun

cp \
  ./build/TurboLndModule.h ../cpp/TurboLndModule.h && \
cp \
  ./build/TurboLndModule.cpp ../cpp/TurboLndModule.cpp && \
cp \
  ./build/index.ts ../src/index.ts && \
cp \
  ./build/mock.ts ../src/mock.ts && \
cp \
  ./build/electrobun/view.ts ../src/electrobun/view.ts && \
cp \
  ./build/electrobun/view-core.ts ../src/electrobun/view-core.ts && \
cp \
  ./build/electrobun/bun.ts ../src/electrobun/bun.ts && \
cp \
  ./build/electrobun/rpc-schema.ts ../src/electrobun/rpc-schema.ts && \
cp \
  ./build/core/NativeTurboLnd.ts ../src/core/NativeTurboLnd.ts && \
cp -r \
  ./build/proto ../src/

echo "[protoc-generator] Done"
