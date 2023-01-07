#version  100

precision mediump float;

varying vec4 vColor;
varying vec2 vTextureCoord; // Texture Koordinaten

uniform sampler2D uTexture; // Texure Unit 0 (default)
uniform int useProceduralTexture;
uniform int proceduralTextureType;

void main() {
    float zbuffer = fract(gl_FragCoord.z);

    if (useProceduralTexture == 0) { // use image texture
                                     gl_FragColor = texture2D(uTexture, vTextureCoord);
                                     //gl_FragColor = vColor * vec4(zbuffer, zbuffer, zbuffer, 1.0);
    } else { // use procedural texture
             // default color is black....
             vec4 tColor = vec4(0, 0, 0, 1);

             if (proceduralTextureType == 1) {
                 float strips = mod(floor(vTextureCoord.s * 36.), 2.);
                 vec4 tColor = vec4(strips, 0, 0, 1);
             }

             gl_FragColor = tColor * vec4(zbuffer, zbuffer, zbuffer, 1.0);
    }
}