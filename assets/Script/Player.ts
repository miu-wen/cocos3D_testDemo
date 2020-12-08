import {_decorator, Component, Vec3,Node,EventKeyboard,Animation,EventMouse,view} from 'cc';
import {
    MOVE_STATUS,
    PLAYER_MOVE_EVENT,
    PlayerAttr,
    START_POS,
    CAMERA_POS,
    MOUSE_MOVE,
    CAMERA_ROTATION,
} from './config/ComponentEventCode';
import {Config} from './config/Config';

const debug = Config.DEBUG;
const { ccclass, property } = _decorator;


@ccclass('Player')
export class Player extends Component {
    @property({
        type:Node,
    })
    public PlayerNode = null;
    @property({
        type:Animation,
    })
    public PlayerBody = null;
    @property({
        type:Node
    })
    public PlayerBodyNode = null;

    private _passFront:boolean = false;
    private _passLeft:boolean = false;
    private _passRight:boolean = false;
    private _passBack:boolean = false;
    private _passJump:boolean = false;
    private _jumping:boolean = false;
    private _pos:Vec3 = new Vec3(START_POS.X,START_POS.Y,START_POS.Z);
    //当前视角默认的中心位置
    private _locationPos:Vec3 = new Vec3(START_POS.X,START_POS.Y,START_POS.Z);
    private _cameraPos:Vec3 = new Vec3(CAMERA_POS.X,CAMERA_POS.Y,CAMERA_POS.Z);

    private _cameraRotation = {x:CAMERA_ROTATION.X,y:CAMERA_ROTATION.Y,z:CAMERA_ROTATION.Z};
    private _cameraRedian = {x:0,y:0,z:0};

    private _speed = PlayerAttr.SPEED;
    private _jumpHeigh = PlayerAttr.JUMPHEIGH;

    start(){
        //添加监听事件
        this._addListen();

    }
    private _addListen(){
        //接收键盘事件
        for (let EVENT_KEY in PLAYER_MOVE_EVENT){
            console.log('player 脚本 EVENT_KEY：',EVENT_KEY);
            this.node.on(PLAYER_MOVE_EVENT[EVENT_KEY],this[PLAYER_MOVE_EVENT[EVENT_KEY].toLowerCase()],this)
        }
        //接收鼠标事件
        this.node.on(MOUSE_MOVE.MOVE_START,this.on_mouse_move,this);
    }
    //鼠标移动事件回调方法
    on_mouse_move(event:EventMouse){
        this._calculationLocation(event);
    }
    private _calculationLocation(event:EventMouse){
        let _x = event.getLocationX();
        let _y = event.getLocationY();
        let size = view.getVisibleSize();
        let centerPos = {x:Math.round(size.x/2),y:Math.round(size.y/2)};
        this._calculationRotationX(_x,centerPos.x);
        this._calculationRotationY(_y,centerPos.y);
        //console.log(this._cameraRotation);
    }
    private _calculationRotationX(x,centerPosX){
        //计算偏移的长度
        let lth = x - centerPosX;
        //计算角度
        let redian = lth*CAMERA_ROTATION.SENSITIVITY;
        this._cameraRedian.y = redian;
        this._cameraRotation.y = redian*180/Math.PI;
    }
    private _calculationRotationY(y,centerPosY){
        //计算偏移的长度
        let lth = y - centerPosY;
        //计算角度
        let redian = lth*CAMERA_ROTATION.SENSITIVITY;
        this._cameraRedian.x = redian;
        this._cameraRotation.x = redian*180/Math.PI;
    }
    //操作键位的按键逻辑
    move_front(isMove:MOVE_STATUS,event:EventKeyboard){
        this._passFront = !!isMove;
    }
    move_back(isMove:MOVE_STATUS,event:EventKeyboard){
        this._passBack = !!isMove;
    }
    move_left(isMove:MOVE_STATUS,event:EventKeyboard){
        this._passLeft = !!isMove;
    }
    move_right(isMove:MOVE_STATUS,event:EventKeyboard){
        this._passRight = !!isMove;
    }
    jump(isMove:MOVE_STATUS,event:EventKeyboard){
        this._passJump = !!isMove;
    }
    setRotation(){
        //TODO 最好做一个是否移动鼠标的判断节约资源
        this.node.setWorldRotationFromEuler(this._cameraRotation.x,this._cameraRotation.y,this._cameraRotation.z);
    }
    //移动
    doMove(){
        let speed = this._speed;
        let rotation = this._cameraRotation.y*Math.PI/180;
        if(this._passFront){
            debug&&console.log('前进');
        }
        if(this._passLeft){
            rotation = (this._cameraRotation.y+90)*Math.PI/180;
            debug&&console.log('向左');
        }
        if(this._passBack){
            rotation = (this._cameraRotation.y+180)*Math.PI/180;
            debug&&console.log('后退');
        }
        if(this._passRight){
            rotation = (this._cameraRotation.y-90)*Math.PI/180;
            debug&&console.log('向右');
        }
        //console.log(rotation,this._cameraRotation.y);
        this._pos.z -=Math.cos(rotation)*speed;
        this._pos.x -=Math.sin(rotation)*speed;
        this.PlayerNode.setWorldPosition(this._pos);
    }
    //跳跃
    doJump(){
        if(!this._jumping){
            debug&&console.log('起跳',this._passJump,this._jumping);
            this._jumping = true;
            //this.PlayerBody.play('PlayerJump');
            setTimeout(()=>{
                this._jumping = false;
            },PlayerAttr.JUMPTIME)
        }
    }
    update(deltaTime: number){
        //同步垂直坐标
        let pos = this.PlayerBodyNode.getWorldPosition();
        this._pos.y = pos.y;
        //前后左右的逻辑
        if(this._passFront||this._passLeft||this._passBack||this._passRight){
            this.doMove();
        }
        //跳跃的逻辑
        if(this._passJump){
            this.doJump();
        }
        //设置摄像机位置
        this.setRotation();
    }

}
