import * as Phaser from 'phaser';

export class Photon extends Phaser.Physics.Arcade.Image
{
    constructor(scene:Phaser.Scene, x:number, y:number, imageKey:string) {
        super(scene, x, y, imageKey);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.on('collision', this.onCollision);
    }

    preUpdate(time:number, delta:number) {
        
    }

    onCollision(other:Phaser.GameObjects.GameObject) {
        console.log('photon collision');
    }
}