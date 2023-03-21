import { Subject, fromEvent } from "rxjs";
import { RxELementModel } from "../../model/element.model";

export const elementHooks = {
    // 移动到选中元素
    hoverSelectElement: new Subject<RxELementModel>(),
    // 移动到选中元素
    leaveSelectElement: new Subject<RxELementModel>(),
    // 选中元素
    selectElement: new Subject<RxELementModel>(),
    // 取消选中
    cancelSelectElement: new Subject<RxELementModel>(),
}