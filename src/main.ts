// import './style.css'
import Experience from './experience/experience.ts'
import Lenis from 'lenis';

import Portfolio from './portfolio/Portfolio.ts';

// new Experience()
// const lenis = new Lenis({
//     autoRaf: true,
// });
declare global {
    interface Window {
      main: Main;
    }
}

class Main {
    // private static instance: Main | null = null
    public lenis: Lenis | null = null
    private experience: Experience
    private portfolio: Portfolio

    constructor() {
        // Main.instance = this
        // this.lenis = new Lenis(
        //     {
        //         autoRaf: true
        //     }
        // )
        this.portfolio = new Portfolio()
        this.experience = new Experience()

        this.experience.loadingScreen.on('loaded', this.initiateLenis.bind(this))

    }

    private initiateLenis(): void {
        this.lenis = new Lenis(
            {
                autoRaf: true
            }
        )
    }

    // public static getInstance(): Main {
    //     if (!Main.instance) {
    //         Main.instance = new Main()

    //     }

    //     return Main.instance
    // }

    public init(): void {
        console.log(this.lenis, this.experience, this.portfolio);
    }
}

new Main()

export default Main