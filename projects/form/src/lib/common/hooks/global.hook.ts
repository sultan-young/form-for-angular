import { Subject, fromEvent } from "rxjs";
import { RxELementModel } from "../../model/element.model";

export const globalHooks = {
    // 窗口尺寸变更
    windowResize: fromEvent(window, 'resize'),
}