#!/bin/bash

set -e

VERSION="1.0.9"
IMAGE="directpurchasebr/direct-purchase-front"

echo "🔧 Verificando se buildx está configurado..."
docker buildx inspect mybuilder > /dev/null 2>&1 || {
  echo "🛠️  Criando builder 'mybuilder'..."
  docker buildx create --name mybuilder --use
}

echo "🚀 Fazendo build e push da imagem $IMAGE:$VERSION"
docker buildx build \
  --platform linux/amd64 \
  --tag $IMAGE:$VERSION \
  --tag $IMAGE:latest \
  --push \
  --build-arg DISABLE_REDIS=true \
  --cache-from=type=registry,ref=$IMAGE:buildcache \
  --cache-to=type=registry,ref=$IMAGE:buildcache,mode=max \
  --progress=plain \
  .

