import {_decorator, Component, Vec3,Node,EventKeyboard,Animation} from 'cc';
import {MOVE_STATUS, PLAYER_MOVE_EVENT, PlayerAttr, START_POS} from './config/ComponentEventCode';
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

    private _speed = PlayerAttr.SPEED;
    private _jumpHeigh = PlayerAttr.JUMPHEIGH;

    start(){

        //接收键盘事件
        for (let EVENT_KEY in PLAYER_MOVE_EVENT){
            console.log('player 脚本 EVENT_KEY：',EVENT_KEY);
            this.node.on(PLAYER_MOVE_EVENT[EVENT_KEY],this[PLAYER_MOVE_EVENT[EVENT_KEY].toLowerCase()],this)
        }

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
    //移动
    doMove(){
        let speed = this._speed;
        if(this._passFront){
            debug&&console.log('前进');
            this._pos.z -=this._speed;
        }
        if(this._passLeft){
            debug&&console.log('向左');
            this._pos.x -=this._speed;
        }
        if(this._passBack){
            debug&&console.log('后退');
            this._pos.z +=this._speed;
        }
        if(this._passRight){
            debug&&console.log('向右');
            this._pos.x +=this._speed;
        }
    }
    //跳跃
    doJump(){
        if(!this._jumping){
            debug&&console.log('起跳',this._passJump,this._jumping);
            this._jumping = true;
            this.PlayerBody.play('PlayerJump');
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
            this.PlayerNode.setWorldPosition(this._pos);
        }
        //跳跃的逻辑
        if(this._passJump){
            this.doJump();
        }
    }

}
