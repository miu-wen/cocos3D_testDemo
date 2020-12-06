import {_decorator, Component, EventKeyboard, macro, Node, systemEvent, SystemEventType} from 'cc';
import {MOVE_STATUS, PLAYER_MOVE_EVENT} from './config/ComponentEventCode';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    // @property({type:EVENT_KEY})
    // public move_front=EVENT_KEY.FRONT;
    //
    // @property({type:EVENT_KEY})
    // public move_back=EVENT_KEY.BACK;
    //
    // @property({type:EVENT_KEY})
    // public move_left=EVENT_KEY.LEFT;
    //
    // @property({type:EVENT_KEY})
    // public move_right=EVENT_KEY.RIGHT;

    @property({type:Node})
    player = null;

    //开始的时候监听键盘事件
    start () {
        systemEvent.on(SystemEventType.KEY_DOWN,this.onKeyDown,this);
        systemEvent.on(SystemEventType.KEY_UP,this.onKeyUp,this);
    }
    //移动方法事件触发
    emitFn(event:EventKeyboard,isMove:MOVE_STATUS){
        switch (event.keyCode) {
            case macro.KEY.w:
                //前进
                this.player.emit(PLAYER_MOVE_EVENT.FRONT,isMove,event);
                break;
            case macro.KEY.a:
                this.player.emit(PLAYER_MOVE_EVENT.LEFT,isMove,event);
                break;
            case macro.KEY.d:
                this.player.emit(PLAYER_MOVE_EVENT.RIGHT,isMove,event);
                break;
            case macro.KEY.s:
                this.player.emit(PLAYER_MOVE_EVENT.BACK,isMove,event);
                break;
            case  macro.KEY.space:
                this.player.emit(PLAYER_MOVE_EVENT.JUMP,isMove,event);
                break;
            default:
                console.log('暂未绑定的按键',event);
                break;
        }
    }
    onKeyDown(event:EventKeyboard){
        console.log(this.player.getPosition());
        this.emitFn(event,MOVE_STATUS.MOVE);
    }
    onKeyUp(event:EventKeyboard){
        this.emitFn(event,MOVE_STATUS.STOP);
    }
}
