import glsl from 'vite-plugin-glsl'
import restart from 'vite-plugin-restart'
import tailwindcss from '@tailwindcss/vite'

export default (
    {
        root: './',
        publicDir: 'public/',
        build:
        {
            outDir: 'dist', 
            emptyOutDir: true, 
            sourcemap: true, 
            target: 'esnext'
        },
        plugins: [
            restart(
                {
                    restart: ['public/**']
                }
            ),
            glsl(),
            tailwindcss(),
        ]
    }
)