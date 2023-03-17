import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { RxELementModel } from "../../model/element.model";


@Injectable()
export class MouseService {
    public hooks = {
        // 移动到选中元素
        hoverSelectElement: new Subject<RxELementModel>(),
        // 移动到选中元素
        leaveSelectElement: new Subject<RxELementModel>(),
        // 选中元素
        selectElement: new Subject<RxELementModel>(),
        // 取消选中
        cancelSelectElement: new Subject<RxELementModel>()
    }
}