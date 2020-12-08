

export enum PLAYER_MOVE_EVENT {
    FRONT = 'MOVE_FRONT',
    BACK = 'MOVE_BACK' ,
    LEFT = 'MOVE_LEFT',
    RIGHT = 'MOVE_RIGHT',
    JUMP = 'JUMP'
}
export enum PlayerAttr {
    SPEED=0.1,
    JUMPHEIGH=1,
    JUMPTIME = 500,//跳跃时间 500毫秒
}
export enum MOVE_STATUS {
    MOVE = 1,
    STOP = 0,
}
export enum MOUSE_MOVE {
    MOVE_START='MOUSE_MOVE_START',
    MOVE_END='MOUSE_MOVE_END',
}
export enum START_POS {
    X = 0,
    Y = 0,
    Z = 0,
}
//player摄像机的相对位置
export enum CAMERA_POS {
    X = 0,
    Y = 0,
    Z = 4,
    RADIUS = 4,

}
//摄像机角度
export enum CAMERA_ROTATION {
    X = 0,
    Y = 0,
    Z = 0,
    SENSITIVITY = 0.008,//视角灵敏度
}

export enum  MOVE_DIRECTION {

}
