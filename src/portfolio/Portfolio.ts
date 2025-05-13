import { projects } from "./constants/contants";
import ProjectCard from "./ProjectCards";

class Portfolio {
    public projectSection: HTMLElement

    constructor () {
        this.projectSection = document.querySelector('.Projects') as HTMLElement;
        this.init();
    }

    private init(): void {
        //Set up Project Cards
        this.projectSection.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-4", "p-4")
        projects.forEach((proj) => {
            new ProjectCard(proj, this.projectSection);
        });
    }
}

export default Portfolio