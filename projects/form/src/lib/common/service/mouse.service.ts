import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ComponentMeta } from "../../form.type";

export interface SelectElementBox {
    uid: string;
    host: HTMLElement,
    componentMeta: ComponentMeta,
}

@Injectable()
export class MouseService {
    public hooks = {
        // 选中元素
        selectElement: new Subject<SelectElementBox>(),
        // 取消选中
        cancelSelectElement: new Subject<SelectElementBox>()
    }
}