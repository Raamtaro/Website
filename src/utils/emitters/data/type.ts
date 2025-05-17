import { Font, GLTF } from "three/examples/jsm/Addons.js"
import { Texture } from "three"

export type ResourceFile = GLTF | Texture | Font

export default interface ModelInfo {
    name: string,
    type: string,
    path: string,
}