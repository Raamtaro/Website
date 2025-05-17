import { Font, TextGeometry } from "three/examples/jsm/Addons.js"
import { Mesh, ShaderMaterial, Uniform, Vector2 } from "three"
import Experience from "../experience"
import Sizes from "../../utils/emitters/sizes"
import TimeKeeper from "../../utils/emitters/timeKeeper"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

// import GUI from "lil-gui"


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
                    uTime: new Uniform(0.0),
                    uAmp: new Uniform(.95),
                    uMaxDistance: new Uniform(1.95),
                    uFrequency: new Uniform(9.25)

                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            }
        )

        this.instance = new Mesh(this.geometry, this.material)
        this.instance.position.set(-1.45, 0.0, -.5)

        this.experience.scene.add(this.instance)

        // this.initGUI()

        this.dimensions.on('resize', this.onResize.bind(this))
        this.time.on('tick', this.update.bind(this))
    }

    // private initGUI(): void {
    //     const gui = new GUI()
    //     const folder = gui.addFolder('TextV2 Controls')
    
    //     // bind to the .value property of each Uniform
    //     folder
    //       .add(this.material.uniforms.uAmp, 'value', 0.0, 2.0, 0.01)
    //       .name('Amplitude')
    //     folder
    //       .add(this.material.uniforms.uMaxDistance, 'value', 0.0, 5.0, 0.01)
    //       .name('Max Distance')
    //     folder
    //       .add(this.material.uniforms.uFrequency, 'value', 0.0, 20.0, 0.1)
    //       .name('Frequency')
    
    //     folder.open()
    // }

    private onResize(): void {
        this.material.uniforms.uResolution.value = new Vector2(this.dimensions.width, this.dimensions.height).multiplyScalar(this.dimensions.pixelRatio)
    }

    private update(): void {
        this.material.uniforms.uTime.value = this.time.uniformElapsed
    }
}

export default TextV2