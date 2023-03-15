import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

interface Action {
    type: string,
    payload: any,
}

@Injectable()
export class BusService {
    public hooks = {
        operationMessage: new Subject<Action>()
    }
}