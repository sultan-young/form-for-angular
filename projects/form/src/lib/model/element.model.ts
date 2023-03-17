import { ComponentRef, Type } from "@angular/core";
import { v4 as uuid } from "uuid"

interface OnDestroy {

}

export interface RxElementOption {
    componentRef: ComponentRef<unknown>;
    name: string;
    key: string;
}

export class RxELementModel {
    public uid = uuid();
    public name: string = '匿名控件';
    public key!: string;
    private componentRef!: ComponentRef<unknown>;
    props?: {
      [prop: string]: unknown
    }

    constructor(options: RxElementOption) {
        this.componentRef = options.componentRef;
        this.name = options.name;
        this.key = options.key;
    }

    onDestroy() {
        if (!this.componentRef) {
            throw Error('componentRef 不存在')
        }
        this.componentRef.destroy();
    }

    // 选中触发
    onSelected() {

    }
    
    get hostEl() {
        return this.componentRef?.location.nativeElement
    }
}