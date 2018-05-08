
import './styles/index.less';
import Lamp from './scripts/Lamp';
import { calculatePower, getLampIndexById, calculatePowerToPoint, generateField } from './scripts/functions';


let container = document.getElementById('dragContainer');
let saveBtn = document.getElementById('saveBtn');
let addLampBtn = document.getElementById('addLampBtn');
let deleteLampBtn = document.getElementById('deleteLampBtn');

let xPoint = document.getElementById('xPoint');
let yPoint = document.getElementById('yPoint');
let signalPoint = document.getElementById('signalPoint');

let heightRoomInput = document.getElementById('heightRoomInput');
let widthRoomInput = document.getElementById('widthRoomInput');
let lengthRoomInput = document.getElementById('lengthRoomInput');

const contextMenu = document.getElementById('contextMenu');

let lamps = null;
let defaultPower = 3;
let heightRoom = 2, widthRoom = 2, lengthRoom = 4; // m

let jsonLamps = localStorage.getItem('lamps');
if (jsonLamps) {
    let oldLamps = JSON.parse(jsonLamps);
    if (oldLamps && Array.isArray(oldLamps) && oldLamps.length) {
        lamps = oldLamps.map(el => new Lamp(container, el, () => {
            calculatePower(lamps, heightRoom, widthRoom, lengthRoom);
        } ));
    }

    heightRoom = parseFloat(localStorage.getItem('heightRoom'));
    widthRoom = parseFloat(localStorage.getItem('widthRoom'));
    lengthRoom = parseFloat(localStorage.getItem('lengthRoom'));

    heightRoomInput.value = heightRoom;
    widthRoomInput.value = widthRoom;
    lengthRoomInput.value = lengthRoom;
}

if (!lamps) {
    lamps = [];
    lamps.push(new Lamp(container, { x: 50, y: 50, power: defaultPower }, () => {
        calculatePower(lamps, heightRoom, widthRoom, lengthRoom);
    }));
}

generateField(widthRoom, lengthRoom);
calculatePower(lamps, heightRoom, widthRoom, lengthRoom);

saveBtn.addEventListener('click', () => {
    localStorage.setItem('lamps', JSON.stringify(lamps));
    localStorage.setItem('heightRoom', heightRoom.toString());
    localStorage.setItem('widthRoom', widthRoom.toString());
    localStorage.setItem('lengthRoom', lengthRoom.toString());

    location.reload();
});

let selectedEl = null;
document.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.pageX, y = e.pageY;

    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    contextMenu.style.display = 'block';

    let target = e.target;
    if(target.className === 'lamp') {
        selectedEl = target;
        addLampBtn.hidden = true;
        deleteLampBtn.hidden = false;
    } else {
        selectedEl = null;
        addLampBtn.hidden = false;
        deleteLampBtn.hidden = true;
    }
});

document.addEventListener("click", () => {
    contextMenu.style.display = 'none';
    selectedEl = null;
});

addLampBtn.addEventListener("click", e => {
    let x = e.clientX, y = e.clientY;
    let { offsetLeft, offsetTop } = container;
    lamps.push(new Lamp(container, { x: x - offsetLeft, y: y - offsetTop, power: defaultPower }, () => {
        calculatePower(lamps, heightRoom, widthRoom, lengthRoom);
    } ));
    calculatePower(lamps, heightRoom, widthRoom, lengthRoom);
});

deleteLampBtn.addEventListener("click", () => {
    let index = getLampIndexById(lamps, parseInt(selectedEl.getAttribute('data-id')));
    console.log(lamps, selectedEl.getAttribute('data-id'));
    lamps[index].element.remove();
    lamps.splice(index, 1);
    calculatePower(lamps, heightRoom, widthRoom, lengthRoom)
});

heightRoomInput.addEventListener('change', e => {
    let target = e.target;
    heightRoom = parseFloat(target.value);
    calculatePower(lamps, heightRoom, widthRoom, lengthRoom);
});

widthRoomInput.addEventListener('change', e => {
    let target = e.target;
    widthRoom = parseFloat(target.value);
    generateField(widthRoom, lengthRoom);
    calculatePower(lamps, heightRoom, widthRoom, lengthRoom);
});

lengthRoomInput.addEventListener('change', e => {
    let target = e.target;
    lengthRoom = parseFloat(target.value);
    generateField(widthRoom, lengthRoom);
    calculatePower(lamps, heightRoom, widthRoom, lengthRoom);
});

container.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.id === 'draw') {
        let x = e.offsetX, y = e.offsetY;
        let power = calculatePowerToPoint(lamps, x, y, heightRoom);
        xPoint.value = (x / e.target.width * widthRoomInput.value).toFixed(2);
        yPoint.value = (y / e.target.height * lengthRoomInput.value).toFixed(2);
        signalPoint.value = power || '';
        return;
    }

    xPoint.value = '';
    yPoint.value =  '';
    signalPoint.value = '';

});



