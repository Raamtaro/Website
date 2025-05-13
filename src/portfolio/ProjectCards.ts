import type {Project} from './constants/contants'

class ProjectCard {
    private props: Project
    private container: HTMLElement

    constructor(props: Project, container: HTMLElement) {
        this.props = props;
        this.container = container;
        this.init();

    }

    private init(): void {
        const { thumbnail, githubLink, liveLink, description } = this.props;

        const outer = document.createElement("div");

        outer.innerHTML = `
        <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
            <img
                src="${thumbnail}"
                alt="Project thumbnail"
                class="h-100 w-full object-cover"
            />
            <div class="p-4 flex-1 flex flex-col">
                <p class="text-gray-800 text-sm flex-1">${description}</p>
                <div class="mt-4 flex space-x-4">
                <a
                    href="${githubLink}"
                    target="_blank"
                    rel="noopener"
                    class="text-indigo-500 hover:text-indigo-700 underline text-sm"
                >
                    GitHub
                </a>
                ${liveLink
                    ? `<a
                        href="${liveLink}"
                        target="_blank"
                        rel="noopener"
                        class="text-indigo-500 hover:text-indigo-700 underline text-sm"
                    >
                        Live
                    </a>`
                    : ""}
                </div>
            </div>
            </div>
        </div>
      `;
      this.container.appendChild(outer);        
    }
}

export default ProjectCard