#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

echo "[protoc-generator] Generating C++ and Typescript bindings based on lnd proto files"

# Detect the environment
if [ "$(uname | cut -c1-5)" = "MINGW" ] || [ -n "${MSYSTEM:-}" ]; then
    # Windows MINGW or MSYS2 environment
    PROTOC_PLUGIN="$SCRIPT_DIR/windows-wrapper.bat"
else
    # Unix-like environment
    PROTOC_PLUGIN="$SCRIPT_DIR/protoc-gen-cpp-functions.ts"
fi

rm -rf ./build
mkdir -p ./build

protoc --plugin=protoc-gen-custom="$PROTOC_PLUGIN" \
--custom_out=./build \
--proto_path=../proto \
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
