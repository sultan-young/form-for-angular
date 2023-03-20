import { ComponentRef, Type } from "@angular/core";
import { Subject } from "rxjs";
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

    public hooks = {
        positionChange: new Subject<DOMRect>(),
        sizeChange: new Subject<DOMRect>(),
    }

    constructor(options: RxElementOption) {
        this.componentRef = options.componentRef;
        this.name = options.name;
        this.key = options.key;
    }

    onInit() {
        this.listenSizeChange();
    }

    onDestroy() {
        if (!this.componentRef) {
            throw Error('componentRef 不存在')
        }
        this.componentRef.destroy();
        // TODO: 如果自身被选中，则将选中状态清除

    }

    // 选中触发
    onSelected() {

    }

    // 位置变化
    onPositionChange() {
        
    }

    // 尺寸变化
    listenSizeChange() {
        const resizeObserver =  new ResizeObserver((entries) => {
            this.hooks.sizeChange.next(entries[0].target.getBoundingClientRect())
        });
        resizeObserver.observe(this.hostEl);
    }
    
    get hostEl() {
        return this.componentRef?.location.nativeElement
    }
}