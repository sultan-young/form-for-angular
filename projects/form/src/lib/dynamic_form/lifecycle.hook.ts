// 控件创建后
export interface dfCreated {
    dfAfterCreate: () => void;
}

// 控件挂在后 
export interface dfMounted {
    dfAfterMount: () => void;
}

// 整个表单集合全部创建完毕后
export interface dfGroupCreated {
    dfGroupCreated: () => void;
}