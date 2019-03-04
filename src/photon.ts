import * as Phaser from 'phaser';
import { Player } from './player';

export class Photon extends Phaser.Physics.Arcade.Image
{
    constructor(scene:Phaser.Scene, x:number, y:number, imageKey:string) {
        super(scene, x, y, imageKey);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.on('collision', this.onCollision);
        this.scene.events.emit('addCollider', this);
    }

    preUpdate(time:number, delta:number) {
        if(!this.scene.physics.world.bounds.contains(this.body.position.x, this.body.position.y)) {
            this.destroy();
        }
    }

    onCollision(other:Phaser.GameObjects.GameObject) {
        if(other instanceof Player) return;
        
        console.log('photon collision');
        this.scene.events.emit('removeCollider', this);
        this.destroy();
    }
}