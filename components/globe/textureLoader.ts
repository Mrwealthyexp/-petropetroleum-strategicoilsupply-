import * as THREE from "three";

const textureCache = new Map<string, THREE.Texture>();

export const EARTH_TEXTURES = {
  day: "https://unpkg.com/three-globe@2.24.13/example/img/earth-blue-marble.jpg",
};

export function loadTexture(url: string): THREE.Texture {
  const cached = textureCache.get(url);
  if (cached) return cached;
  const texture = new THREE.TextureLoader().load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, texture);
  return texture;
}
