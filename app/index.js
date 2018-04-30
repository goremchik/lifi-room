
import './styles/index.less';
import Lamp from './scripts/Lamp';

let url = 'http://localhost:3000/gateway';
let container = document.getElementById('dragContainer');
let saveBtn = document.getElementById('saveBtn');

const contextMenu = document.getElementById('contextMenu');

let lamps = null;
let height = 200; //cm
let defaultPower = 100;

let jsonLamps = localStorage.getItem('lamps');
if (jsonLamps) {
    let oldLamps = JSON.parse(jsonLamps);
    if (oldLamps && Array.isArray(oldLamps) && oldLamps.length) {
        lamps = oldLamps.map(el => new Lamp(container, el));
    }
}

if (!lamps) {
    lamps = [];
    lamps.push(new Lamp(container, { x: 50, y: 50, power: defaultPower }));
}

calculatePower(lamps);

saveBtn.addEventListener('click', () => {
    localStorage.setItem('lamps', JSON.stringify(lamps));
    location.reload();
});


let selectedEl = null;
document.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.pageX, y = e.pageY;

    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    contextMenu.style.display = 'block';
});

document.addEventListener("click", () => {
    contextMenu.style.display = 'none';
    selectedEl = null;
});

document.getElementById('addLampBtn').addEventListener("click", e => {
    let x = e.clientX, y = e.clientY;
    let { offsetLeft, offsetTop } = container;
    lamps.push(new Lamp(container, { x: x - offsetLeft, y: y - offsetTop, power: defaultPower }));
    calculatePower(lamps);
});

document.getElementById('deleteLampBtn').addEventListener("click", e => {
    let x = e.screenX, y = e.screenY;

    let index = getLampIndexById(selectedEl.getAttribute('data-id'));
    lamps[index].element.remove();

    lamps.slice(index, index + 1);
    //contextMenu.style.display = 'none';
    calculatePower(lamps)
});

function calculatePower(lamps) {

}

function getLampIndexById(id) {
    return lamps.findIndex(el => el.id === id);
}