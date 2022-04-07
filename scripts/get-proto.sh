#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

# get cosmos sdk from github
ROOT_PROTO_DIR=$(go list -f '{{ .Dir }}' -m github.com/cosmos/cosmos-sdk)
ROOT_CLAN_DIR=$(go list -f '{{ .Dir }}' -m github.com/ClanNetwork/clan-network)
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
LOCAL_PROTO_DIR="$ROOT_CLAN_DIR/proto"

OUT_DIR="./codec/"

mkdir -p "$OUT_DIR"

protoc \
  --proto_path="$LOCAL_PROTO_DIR" \
  --proto_path="$COSMOS_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --js_out="import_style=commonjs,binary:$OUT_DIR" \
  "$LOCAL_PROTO_DIR/clan/claim/v1beta1/tx.proto" \
  "$LOCAL_PROTO_DIR/clan/claim/v1beta1/query.proto" \


# Remove unnecessary codec files
rm -rf \
  src/codec/cosmos_proto/ \
  src/codec/gogoproto/ \
  src/codec/google/api/ \
  src/codec/google/protobuf/descriptor.ts