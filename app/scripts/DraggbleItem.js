/**
 * Created by Andrii_Shoferivskyi on 2018-04-26.
 */

export default class DraggbleItem {

    constructor(container, x, y, power, id, callback) {
        this.container = container;
        this.id = id || parseInt(Math.random() * 1e9);
        this.element = this.createElement(power, id);
        this.setElementPosition(x, y);
        this.callback = callback;
        this.element.addEventListener('dragend', this.dragEnd.bind(this));
    }

    dragEnd(e) {
        let el = e.target;
        let { offsetLeft, offsetTop } = this.container;
        this.setElementPosition(e.clientX - offsetLeft, e.clientY - offsetTop);

        this.callback();
    };

    setElementPosition(x, y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        this.x = x;
        this.y = y;
    }

    createElement(power) {
        let el = document.createElement('div');

        el.className = 'draggable';
        el.setAttribute('draggable', 'true');


        let lamp = document.createElement('div');
        lamp.className = 'lamp';
        lamp.style.textAlign = 'center';
        lamp.innerText = power;
        lamp.setAttribute('data-id', this.id);
        el.appendChild(lamp);

        this.container.appendChild(el);
        return el;
    }

    getData() {
        let size = parseInt(this.element.clientHeight / 2);

        let data = {
            power: this.power,
            x: this.x + size,
            y: this.y + size
        };
        console.log(data);
        return data;
    }
}