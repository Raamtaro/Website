// import './style.css'
import Experience from './experience/experience.ts'
import Lenis from 'lenis';

import Portfolio from './portfolio/Portfolio.ts';

// new Experience()
// const lenis = new Lenis({
//     autoRaf: true,
// });


class main {
    private lenis: Lenis
    private experience: Experience
    private portfolio: Portfolio

    constructor() {
        this.lenis = new Lenis(
            {
                autoRaf: true
            }
        )
        this.experience = new Experience()

        this.portfolio = new Portfolio()

    }

    public init(): void {

    }
}

new main()