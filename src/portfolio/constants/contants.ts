export interface Project {
    thumbnail: string,
    githubLink: string,
    liveLink?: string,
    description: string,
}

export const projects: Project[] = [
    {
      thumbnail: 'previews/TsenderPreview.png',
      githubLink: 'https://github.com/Raamtaro/TSender_Clone',
      liveLink: 'https://gigantic-arm-short.on-fleek.app/',
      description: 'A clone of the T-Sender dApp built with TypeScript, Next.js, React.js, Wagmi and Rainbow Kit.',
    },
    {
      thumbnail: 'previews/RefractPreview.png',
      githubLink: 'https://github.com/Raamtaro/NFT_Scene_Gallery',
      liveLink: 'https://refractgallery.netlify.app/',
      description: 'An interactive Particle and Refraction effect exhibit built with THREE.js, TypeScript and WebGL.',
    },
    {
      thumbnail: 'previews/MessengerPreview.png',
      githubLink: 'https://github.com/Raamtaro/RaamtaroMessengerServer',
      // no liveLink here, it’s optional
      description: 'A Chat Messenger REST API built with JavaScript, Prisma, PostgresSQL, Express.js and Node.js',
    },
    {
      thumbnail: 'previews/BoilerPlatePreview.png',
      githubLink: 'https://github.com/Raamtaro/TypeScript-THREEJS-Starter',
      // no liveLink here, it’s optional
      description: 'A re-usable boilerplate for THREE.js and TypeScript projects utilizing a Singleton approach.',
    },
    {
      thumbnail: 'previews/WebGLNFTPreview.png',
      githubLink: 'https://github.com/Raamtaro/WebGLNft',
      // no liveLink here, it’s optional
      description: 'A Solidity Smart Contract with ~90% test coverage built on Foundry, implementing the ERC271 NFT protocol.',
    },
    // …more cards
]


export const description: string = "I'm Raam - a Full Stack Developer, a Yoga Teacher and a former Aerospace Engineer."