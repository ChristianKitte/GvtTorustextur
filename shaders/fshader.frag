#version  100

precision mediump float;

varying vec4 vColor;
varying vec2 vTextureCoord; // Texture Koordinaten

uniform sampler2D uTexture; // Texure Unit 0 (default)

void main() {
    float zbuffer = fract(gl_FragCoord.z);
    gl_FragColor = texture2D(uTexture, vTextureCoord);
    //gl_FragColor = vColor * vec4(zbuffer, zbuffer, zbuffer, 1.0);
}