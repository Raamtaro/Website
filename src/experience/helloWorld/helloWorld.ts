import Experience from "../experience";
import * as THREE from 'three';

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


class HelloWorld {

    private experience: Experience
    private scene: THREE.Scene
    private material: THREE.ShaderMaterial
    private geometry: THREE.PlaneGeometry

    public instance: THREE.Mesh





    constructor() {
        this.experience = Experience.getInstance()
        this.scene = this.experience.scene

        this.geometry = new THREE.PlaneGeometry(2, 2)
        this.material = new THREE.ShaderMaterial(
            {
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            }
        )

        this.instance = new THREE.Mesh(this.geometry, this.material)
        this.init()
        
    }

    private init(): void {
        // this.scene.add(this.instance)
    }
}

export default HelloWorld