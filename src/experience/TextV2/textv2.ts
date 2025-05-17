import { Font, TextGeometry } from "three/examples/jsm/Addons.js"
import { Mesh, ShaderMaterial, Uniform, Vector2 } from "three"
import Experience from "../experience"
import Sizes from "../../utils/emitters/sizes"
import TimeKeeper from "../../utils/emitters/timeKeeper"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


class TextV2 {

    private experience: Experience
    private dimensions: Sizes
    private time: TimeKeeper
    private material: ShaderMaterial
    private font: Font
    private geometry: TextGeometry

    public instance: Mesh


    constructor(font: Font, text: string) {

        this.experience = Experience.getInstance()
        this.dimensions = this.experience.size
        this.time = this.experience.time
        this.font = font

        /**
         * Geometry + Material Setup
         */

        this.geometry = new TextGeometry(text, 
            {
                font: this.font,
                size: 0.275,
                depth: 0.01
            }
        )

        this.material = new ShaderMaterial(
            {
                uniforms: {
                    uResolution: new Uniform(new Vector2(this.dimensions.width, this.dimensions.height).multiplyScalar(this.dimensions.pixelRatio)),
                    uTime: new Uniform(0.0)                    
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            }
        )

        this.instance = new Mesh(this.geometry, this.material)
        this.instance.position.set(-1.45, 0.0, -.5)

        this.experience.scene.add(this.instance)

        this.dimensions.on('resize', this.onResize.bind(this))
        this.time.on('tick', this.update.bind(this))
    }

    private onResize(): void {
        this.material.uniforms.uResolution.value = new Vector2(this.dimensions.width, this.dimensions.height).multiplyScalar(this.dimensions.pixelRatio)
    }

    private update(): void {
        this.material.uniforms.uTime.value = this.time.uniformElapsed
    }
}

export default TextV2