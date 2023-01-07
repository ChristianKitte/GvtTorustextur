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
                                     gl_FragColor = texture2D(uTexture, vTextureCoord)*vColor;
    } else if (useProceduralTexture == 2) { // use material
                                            gl_FragColor = vColor * vec4(zbuffer, zbuffer, zbuffer, 1.0);
    }
    else { // use procedural texture
           // default color is black....
           vec4 tColor = vec4(0, 0, 0, 1);

           if (proceduralTextureType == 1) { // stripes
                                             float strips = mod(floor(vTextureCoord.s * 36.), 2.);
                                             tColor = vec4(strips, 0, 0, 1);
           } else if (proceduralTextureType == 2) { // colored squares
                                                    float vStrips = mod(floor(vTextureCoord.s * 36.), 2.);
                                                    float hStrips = mod(floor(vTextureCoord.t * 36.), 2.);

                                                    if (vStrips == 1. && hStrips == 1.) {
                                                        tColor = vec4(vStrips, hStrips, 0, 1);
                                                    } else {
                                                        tColor = vec4(vStrips, hStrips, 1, 1);
                                                    }
           } else if (proceduralTextureType == 3) { // grey square 1
                                                    float t = vTextureCoord.t;

                                                    float vStrips = mod(floor(vTextureCoord.s * 36.), 2.);
                                                    float hStrips = mod(floor(vTextureCoord.t * 36.), 2.);

                                                    tColor = vec4(0. + t, 1. - t, 0, 1);

                                                    if (vStrips == 1. && hStrips == 1.) {
                                                        vec4 squares = vec4(.3, .3, .3, .3);
                                                        tColor = tColor + squares;
                                                    }
           } else if (proceduralTextureType == 4) { // grey square 2
                                                    float s = vTextureCoord.s;
                                                    float t = vTextureCoord.t;

                                                    float vStrips = mod(floor(vTextureCoord.s * 36.), 2.);
                                                    float hStrips = mod(floor(vTextureCoord.t * 36.), 2.);

                                                    tColor = vec4(0. + s, 1. - s, 0, 1);

                                                    if (vStrips == 1. && hStrips == 1.) {
                                                        float x = sin(s);
                                                        vec4 squares = vec4(x, x, x, .3);
                                                        tColor = tColor + squares;
                                                    }
           } else if (proceduralTextureType == 5) { // circles with gradient
                                                    // inspiriert von http://learnwebgl.brown37.net/10_surface_properties/texture_mapping_procedural.html
                                                    float PI = 3.141592653589793;
                                                    float scale = 25.; // je größer, umso kleiner die Kreise / Bezirke
                                                    float whiteLines = 0.02; // je kleiner umso kleiner die weißen linien

                                                    float s = vTextureCoord.s;
                                                    float t = vTextureCoord.t;

                                                    float percent = abs(sin(s * scale * PI)) * abs(sin(t * scale * PI));
                                                    float percent2 = abs(sin((1. - s) * scale * PI)) * abs(sin((1. - t) * scale * PI));

                                                    //tColor = vec4(1., 0., 0., 1.) * percent;
                                                    tColor = vec4(0. + percent, 1. - percent, 0., 1. * percent2 / whiteLines);
           }

           gl_FragColor = tColor * vec4(zbuffer, zbuffer, zbuffer, 1.0)*vColor;
    }
}