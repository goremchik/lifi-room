

function calculatePower(lamps, height, width, length) {

}

function calculatePowerToPoint(lamps, x, y) {

}

function getLampIndexById(lamps, id) {
    return lamps.findIndex(el => el.id === parseInt(id));
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