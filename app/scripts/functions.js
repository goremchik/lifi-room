
let pi = Math.PI, pow = Math.pow, sin = Math.sin, cos = Math.cos, log = Math.log;

function calculatePower(lamps, height, width, length) {
    let drawContainer = document.getElementById('draw');
    var ctx = drawContainer.getContext('2d');

    let widthDraw = drawContainer.width;
    let heightDraw = drawContainer.height;

    for (let i = 0; i < widthDraw - 2; i += 2) {
        for (let j = 0; j < heightDraw - 2; j += 2) {
            let color = powerToColor(calculatePowerToPoint(lamps, i, j, height));
            ctx.fillStyle = color;
            ctx.fillRect(i, j, 2, 2);
        }
    }
}

let colors = [
    { r: 170, g: 170, b: 170, value: 10e-5 },
    { r: 0,  g: 11, b: 255,   value: 10e-4 },
    { r: 40, g: 167,  b: 40,  value: 10e-3 },
    { r: 255, g: 236, b: 7,   value: 10e-2 },
    { r: 236,   g: 13, b: 13, value: 10e-1 }
];

function powerToColor(value) {

    let states = colors;
    let perfect = 'rgb(' + states[states.length - 1].r + ',' + states[states.length - 1].g + ',' + states[states.length - 1].b + ')';
    let error = 'rgb(' + states[0].r + ',' + states[0].g + ',' + states[0].b + ')';
    if (value >= states[states.length - 1].value) {
        return perfect;
    } else if (value < states[0].value) {
        return error;
    }

    for (var i = 1; i < states.length; i++) {
        if (value < states[i].value) {
            break;
        }
    }

    var prev = states[i - 1];
    var next = states[i];

    var diffVal = next.value - prev.value;
    var diffR = next.r - prev.r;
    var diffG = next.g - prev.g;
    var diffB = next.b - prev.b;

    var percent = (value - prev.value) / diffVal;

    var newR = parseInt(prev.r + percent * diffR);
    var newG = parseInt(prev.g + percent * diffG);
    var newB = parseInt(prev.b + percent * diffB);

    return 'rgb(' + newR + ',' + newG + ',' + newB + ')';
}

function calculatePowerToPoint(lamps, x, y, height) {
    let widthRoom = parseFloat(localStorage.getItem('widthRoom'));
    let lengthRoom = parseFloat(localStorage.getItem('lengthRoom'));

    let drawCon = document.getElementById('draw');
    x = x / drawCon.width * widthRoom;
    y = y / drawCon.height * lengthRoom;

    let sum = 0;
    for (let i = 0 ; i < lamps.length; i++) {
        let lamp = lamps[i];
        let d = pow( pow(lamp.x / drawCon.width * widthRoom - x, 2) + pow(lamp.y/ drawCon.height * lengthRoom - y, 2), 0.5);
        sum += hLos(height, d, lamp.power);
    }

    return sum;
}

function getLampIndexById(lamps, id) {
    return lamps.findIndex(el => el.id === parseInt(id));
}

function hLos(h, d, power) {

    let Apd = 10e-4; // Площа фотодетектора
    let gf = 1;      // Коеф оптичного фільтру
    let n = 1.5;     // Коеф відбиття
    let psi_max = (90 * pi) / 180;  // Кут прийому ФД, рад (наугад)
    let gc = pow(n, 2) / pow( sin(psi_max), 2); // Коеф посилення оптичного концентратота
    let fi12 = (60 * pi) / 180;         // Половинний кут (відб), рад (наугад)
    let m = -log(2) / log( cos(fi12) ); // Ламб. еміс. порядоk


    let a = (m + 1) * Apd * pow(h / d, m) * gf * gc * (h / d);
    let b = 2 * pi * (pow(d, 2) + pow(h, 2));
    let h_los = a / b;

    return h_los * power;
}

function generateField(width, length) {
    let container = document.getElementById('dragContainer');
    let draw = document.getElementById('draw');
    let sizeKoef = parseInt(container.style.width) / width;

    let newHeight = sizeKoef * length;
    container.style.height = (sizeKoef * length) + 'px';
    draw.height = newHeight;
}

export { calculatePower, getLampIndexById, calculatePowerToPoint, generateField };