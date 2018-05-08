/**
 * Created by Andrii_Shoferivskyi on 2018-04-27.
 */

import DraggbleItem from './DraggbleItem';

const modalSaveBtn = document.getElementById('modalSaveBtn');
const modalBody = document.getElementById('modalBody');
const modalDeleteBtn = document.getElementById('modalDeleteBtn');

export default class Lamp extends DraggbleItem {

    constructor(container, { x, y, power, id }, callback) {
        super(container, x, y, power, id, callback);

        this.power = power;
        this.element.addEventListener('click', (e) => { this.onClick(e); });
    }

    toJSON() {
        let jsonObj = Object.assign({}, this);
        delete jsonObj.container;
        delete jsonObj.element;

        return jsonObj;
    }

    onClick(e) {

        $('#modal').modal('show');
        modalBody.innerHTML = `
             <div id="mainContent">
                ${ this.createInput('id', this.id, true) }
                ${ this.createInput('power', this.power) }
                ${ this.createInput('X', this.x) }
                ${ this.createInput('Y', this.y) }
            </div>
        `;

        modalSaveBtn.onclick = this.onSaveClick.bind(this);
    }

    getDataValue(name) {
        return modalBody.querySelector(`[data-name="${ name }"]`).value
    }

    onSaveClick() {
        this.id = this.getDataValue('id');
        this.power = this.getDataValue('power');
        this.x = this.getDataValue('X');
        this.y = this.getDataValue('Y');
        $('#modal').modal('hide');

        this.element.childNodes[0].innerText = this.power;
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
        this.callback();
    }

    createInput(name, value, disabled) {
        return `
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text input-text-left">${ name }</span>
              </div>
                  <input type="text" data-name="${ name }" class="form-control value-item" value="${ value }" ${ disabled ? 'disabled' : '' }>
            </div>
        `;
    }
}

