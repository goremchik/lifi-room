/**
 * Created by Andrii_Shoferivskyi on 2018-04-27.
 */

import DraggbleItem from './DraggbleItem';

const modalSaveBtn = document.getElementById('modalSaveBtn');
const modalBody = document.getElementById('modalBody');
const modalDeleteBtn = document.getElementById('modalDeleteBtn');

export default class Lamp extends DraggbleItem {

    constructor(container, { x, y, power, id }) {
        super(container, x, y, power, id);

        this.power = power;
        this.id = id || parseInt(Math.random() * 1e9);

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

        console.log(this);

        $('#modal').modal('hide');

        this.element.childNodes[0].innerText = this.power;
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

