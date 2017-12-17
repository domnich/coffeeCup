import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AppEmitterProvider {
    public appStarted: EventEmitter<number> = new EventEmitter();
    public emitAppStatrted(value) {
        this.appStarted.emit(value);
    }
    public getAppStartedEmiter() {
        return this.appStarted;
    }
}
