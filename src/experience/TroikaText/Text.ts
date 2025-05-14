import { FontLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three'
import { TextGeometry } from "three/examples/jsm/Addons.js";
import Experience from "../experience";

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import Sizes from "../../utils/emitters/sizes";
import TimeKeeper from "../../utils/emitters/timeKeeper";

class Text {
    private _text: string;
    private loader: FontLoader;
    private experience: Experience;
    public instance: THREE.Mesh | null
    private dimensions: Sizes
    private time: TimeKeeper

    constructor(text: string) {
        this._text = text;

        this.experience = Experience.getInstance()
        this.dimensions = this.experience.size
        this.time = this.experience.time
        this.loader = new FontLoader();
        this.instance = null;
        this.init()
        this.dimensions.on('resize', this.onResize.bind(this))
        this.time.on('tick', this.update.bind(this))
    }

    private async init(): Promise<void>{
        this.loadFont().then((mesh) => {
            this.instance = mesh;
            this.instance.position.set(-1.45, 0.0, -.5);
            this.experience.scene.add(this.instance);
        }).catch((error) => {
            console.error('Error loading font:', error);
        });
    }

    private async loadFont(): Promise<THREE.Mesh> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                'fonts/Entirely_Regular.json',
                (font) => {
                    const geometry = new TextGeometry(this._text, {
                        font: font,
                        size: 0.275,
                        depth: 0.01
                        
                    });
                    // const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
                    const material = new THREE.ShaderMaterial(
                        {
                            uniforms: {
                                uResolution: new THREE.Uniform(new THREE.Vector2(this.experience.size.width, this.experience.size.height).multiplyScalar(this.experience.size.pixelRatio)),
                                uTime: new THREE.Uniform(0.0)
                            },

                            vertexShader: vertexShader,
                            fragmentShader: fragmentShader,
                           
                        }
                    )
                    const mesh = new THREE.Mesh(geometry, material);
                    resolve(mesh);
                },
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });
    }

    private onResize(): void {
        if (this.instance) {
            (this.instance.material as THREE.ShaderMaterial).uniforms.uResolution.value = new THREE.Vector2(this.experience.size.width, this.experience.size.height).multiplyScalar(this.experience.size.pixelRatio)
        }
    }

    private update(): void {    
        if (this.instance) {
            (this.instance.material as THREE.ShaderMaterial).uniforms.uTime.value = this.time.uniformElapsed
        }
    }


}

export default Text