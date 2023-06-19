import {makeAutoObservable} from 'mobx';

class InputControl {
    valueInput = '';
    valueInputClone = '';

    constructor () {
        makeAutoObservable(this);
    }

    setValueInput(valueInput) {
        this.valueInput = valueInput;
    }

    setValueInputClone(valueInputClone) {
        this.valueInputClone = valueInputClone;
    }
}

export default new InputControl();