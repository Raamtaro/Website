import * as THREE from 'three'
import { Font } from 'three/examples/jsm/Addons.js';
import Sizes from '../utils/emitters/sizes';
import TimeKeeper from '../utils/emitters/timeKeeper';
import Mouse from '../utils/mouse.ts';
import Renderer from './renderer.ts';
import Camera from './camera.ts';
import Glass from './Glass/Glass.ts';
import Resources from '../utils/emitters/resources.ts';
import TextV2 from './TextV2/textv2.ts';

// import type { ResourceFile } from '../utils/emitters/data/type.ts';


declare global {
    interface Window {
      experience: Experience;
    }
}

class Experience {

    private static instance: Experience | null = null

    public canvas: HTMLCanvasElement
    public size: Sizes 
    public time: TimeKeeper
    public renderer: Renderer 
    public camera: Camera
    public mouse: Mouse
    public scene: THREE.Scene

    // public text: Text
    public text: TextV2 | null = null
    public glass: Glass

    public resources: Resources

    constructor() {

        Experience.instance = this

        this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
        this.size = new Sizes()
        this.time = new TimeKeeper()
        this.mouse = new Mouse()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.scene = new THREE.Scene()

        this.resources = new Resources()

        console.log(this.resources)

        this.glass = new Glass(new THREE.TorusGeometry(1, .4, 64, 64))
        this.glass.instance.position.set(0, 0, 2.5)

        this.time.on('tick', this.render.bind(this)) 
        this.resources.on('ready', this.init.bind(this))
    }


    public static getInstance(): Experience {
        if (!Experience.instance) {
            Experience.instance = new Experience()

        }

        return Experience.instance
    }

    private init(): void {
        this.text = new TextV2(this.resources.items['entirely'] as Font, "RAAM SANGHANI")
    }


    private render(): void {
        this.renderer.instance.render(this.scene, this.camera.instance)

    }
}

export default Experience