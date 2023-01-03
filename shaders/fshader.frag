#version  100

precision mediump float;

varying vec4 vColor;

void main() {
    float zbuffer = fract(gl_FragCoord.z);
    gl_FragColor = vColor * vec4(zbuffer, zbuffer, zbuffer, 1.0);
}