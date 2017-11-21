import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AppEmitterProvider {
    public keyboardHeightChanged: EventEmitter<number> = new EventEmitter();
    public emitKeyboardHeightChanged(numb: number) {
        this.keyboardHeightChanged.emit(numb);
    }
    public getKeyboardHeightEmitter() {
        return this.keyboardHeightChanged;
    }
}
