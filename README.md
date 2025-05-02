# TypeScript THREE JS Starter
This repo is built with TypeScript and lays out all of the ground work for working with Three JS. It uses the singleton approach as well as an `EventEmitter` class to propagate events and keep dependencies centralized around an `Experience` class.

The `Experience` sets up the main rendering pipeline and brings together all of the Three JS scene components, such as the Camera, Renderer, 3D objects, and anything else.

This particular project simply has a camera pointed at a `THREE.PlaneGeometry` with a simple shader - mapping `uv` coordinates to the `gl_FragColor`. 

This is meant to be iterated upon.

### How to use:
1. Clone this repo using `git clone` in the CLI with the URL
   
2. `cd` to the root of this project and then run the following in the CLI:
    ```
    git remote remove origin
    ```
    This will free up the repo from the original github project

3. Follow the directions here to hook it up to a new Github Repo: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

4. Whenever you're done with step 3, run, in the CLI:
    ```
    npm install
    ```

5. Next, run:
    ```
    npm run dev
    ```
    This should run an instance on port 5173, or the next available.