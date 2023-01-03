const loadImage = () => new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = './images/image.png';
});

const getSourceSynch = function (url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return (req.status == 200) ? req.responseText : null;
};

const vertexShaderSrc = getSourceSynch("./shaders/vshader.vert");
const fragmentShaderSrc = getSourceSynch("./shaders/fshader.frag");

