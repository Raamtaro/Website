import { LoadingManager, Mesh, PlaneGeometry, Uniform, ShaderMaterial, Scene} from "three" 
import Experience from "../experience"
import gsap from "gsap"

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

class LoadingScreen {
    private experience: Experience
    private scene: Scene;
    private geometry: PlaneGeometry;
    private material: ShaderMaterial;
    private instance: Mesh;

    private currentProgress = {value: 0};
    public loadingManager: LoadingManager;

    constructor() {
        this.experience = Experience.getInstance();
        this.scene = this.experience.scene;
        this.geometry = new PlaneGeometry(2, 2, 1, 1);
        this.material = new ShaderMaterial(
            {
                uniforms: {
                    uAlpha: new Uniform(1.0)
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true
            }
        )

        this.instance = new Mesh(this.geometry, this.material)
        this.scene.add(this.instance)


        this.loadingManager = new LoadingManager(
            this.onLoadComplete.bind(this),
            this.onProgress.bind(this)
        )
    }

    private onProgress(_: string, itemsLoaded: number, itemsTotal: number) {
        const pct = Math.floor((itemsLoaded / itemsTotal) * 100);
        const str = String(pct).padStart(3, "0");
        const digits = document.querySelectorAll<HTMLDivElement>(
          ".loading-digit"
        );
    
        digits.forEach((el, i) => {
          const newChar = str[i];
          if (el.textContent !== newChar && itemsLoaded / itemsTotal !== 1 ) {
            const tl = gsap.timeline();
            tl.to(el, { y: "-1em", opacity: 0, duration: 0.3 });
            tl.set(el, { y: "1em", textContent: newChar });
            tl.to(el, { y: "0em", opacity: 1, duration: 0.3 });
          }
        });
    }

    private onLoadComplete() {
        const digits = document.querySelectorAll<HTMLDivElement>(
          ".loading-digit"
        );
        const letters = document.querySelectorAll<HTMLDivElement>(
          ".title-text"
        );
        const titleEl = document.querySelector<HTMLHeadingElement>(
          ".landing-title"
        )!;
    
        // calculate how much we need to move the title so it ends up 20px from top/left
        const { left, top } = titleEl.getBoundingClientRect();
        const moveX = 20 - left;
        const moveY = 20 - top;
    
        gsap
            .timeline()
            // 2) roll all digits up & fade out
            .to(digits, {
                y: "-1em",
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
            })
            // 3) fade in each letter
            .to(
                letters,
                {
                opacity: 1,
                stagger: 0.05,
                duration: 0.3,
                },
                ">-0.2"
            )
            // 4) slide the landing‐title into the corner
            .to(
                titleEl,
                {
                x: moveX,
                y: moveY,
                duration: 0.8,
                ease: "power2.inOut",
                },
                ">-0.1"
            )
            // 5) fade out the black overlay
            .to(this.material.uniforms.uAlpha, {
                value: 0,
                duration: 1,
                onComplete: () => {
                // optional: remove the mesh entirely
                this.scene.remove(this.instance);
                },
            });
    }
}

export default LoadingScreen