varying vec2 vUv;
uniform vec2 uResolution;

void main () {
    vec2 st = gl_FragCoord.xy/uResolution.xy;
    gl_FragColor = vec4(vec3(0.9217), 1.0);
}