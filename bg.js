const IMG_NUMBER = 5;
const body = document.querySelector('body');

function paintImage(imgNumber) {
    const image = new Image(); //! image tag 생성방법!
    image.src = `./images/${imgNumber+1}.jpg`;
    image.classList.add('bgImage');
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();