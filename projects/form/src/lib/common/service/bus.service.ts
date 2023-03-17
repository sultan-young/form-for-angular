import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

interface Action {
    type: string,
    payload: any,
}

@Injectable()
export class BusService {
    public hooks = {
        // 全局操作区域消息
        operationMessage: new Subject<Action>()
        
    }
}