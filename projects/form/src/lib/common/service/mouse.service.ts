import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { RXElement } from "../../form.type";


@Injectable()
export class MouseService {
    public hooks = {
        // 移动到选中元素
        hoverSelectElement: new Subject<RXElement>(),
        // 移动到选中元素
        leaveSelectElement: new Subject<RXElement>(),
        // 选中元素
        selectElement: new Subject<RXElement>(),
        // 取消选中
        cancelSelectElement: new Subject<RXElement>()
    }
}