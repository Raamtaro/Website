varying vec2 vUv;
uniform float uTime;

#define M_PI 3.1415926535897932384626433832795
#include ./includes/curl.glsl

void main () {


    vec3 newPos = position.xyz;
    float f = 9.25;
    float amplitude = .95;
    float maxDistance = 1.95;
    vec3 target = position.xyz + curl(newPos.x * f, newPos.y * f, newPos.z * f) * amplitude;

    float d = length(newPos-target) / maxDistance;
    newPos = mix(position.xyz, target, pow(d, 5.0));
    

    vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vUv = uv;
}