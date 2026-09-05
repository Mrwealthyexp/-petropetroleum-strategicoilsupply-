import * as THREE from 'three';
const textureCache = new Map<string, THREE.Texture>();
export function loadTexture(url: string): THREE.Texture {
  if (textureCache.has(url)) return textureCache.get(url)!;
  const texture = new THREE.TextureLoader().load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  textureCache.set(url, texture);
  return texture;
}
export const EARTH_TEXTURES = {
  day: 'https://unpkg.com/three-globe@2.24.13/example/img/earth-blue-marble.jpg',
  bump: 'https://unpkg.com/three-globe@2.24.13/example/img/earth-topology.png',
};