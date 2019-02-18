import * as Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Image
{
    angularVelocity:number = 180;
    progradeAccel:number = 200;
    retrogradeAccel:number = 50;

    constructor(scene:Phaser.Scene, x:number, y:number, imageKey:string) {
        super(scene, x, y, imageKey);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    preUpdate(time:number, delta:number) {
        let keys:Phaser.Input.Keyboard.CursorKeys = this.scene.input.keyboard.createCursorKeys();

        this.setAngularVelocity(0);
        this.setAcceleration(0,0);

        if (keys.left.isDown)
        {
            this.setAngularVelocity(-this.angularVelocity);
        }
        if (keys.right.isDown)
        {
            this.setAngularVelocity(this.angularVelocity); // degrees/s
            //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#setAngularVelocity
        }
        if (keys.up.isDown)
        {
            let facingY:number = -Math.cos(this.rotation);
            let facingX:number = Math.sin(this.rotation);
            this.setAcceleration(facingX*this.progradeAccel, facingY*this.progradeAccel); // pixels/s^2
        }
        if (keys.down.isDown)
        {
            let facingY:number = -Math.cos(this.rotation);
            let facingX:number = Math.sin(this.rotation);
            this.setAcceleration(-facingX*this.retrogradeAccel, -facingY*this.retrogradeAccel); // pixels/s^2
        }
        this.scene.physics.world.wrapObject(this);
    }
}