import { _decorator, Component, Node,Collider,ITriggerEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColliderBox')
export class ColliderBox extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        let ColliderBox = this.getComponent(Collider);
        console.log(ColliderBox,this);
        ColliderBox.on('onTriggerStay', this.onTrigger, this);
        ColliderBox.on('onCollisionStay', this.onCollision, this);
    }
    private onTrigger(event: ITriggerEvent){
        console.log(event);
    }
    private onCollision(event: ITriggerEvent){
        console.log(event);
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
