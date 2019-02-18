import * as Phaser from 'phaser';
import * as Constants from './constants';
import { Photon } from './photon';

export class Player extends Phaser.Physics.Arcade.Image
{
    angularVelocity:number = 180;
    progradeAccel:number = 200;
    retrogradeAccel:number = 50;
    readonly photonChargeTime:number = 500; // in ms
    photonCharger:number = this.photonChargeTime;

    constructor(scene:Phaser.Scene, x:number, y:number) {
        super(scene, x, y, Constants.kPlayerShipImage);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    preUpdate(time:number, delta:number) {
        if(this.photonCharger < this.photonChargeTime) {
            this.photonCharger += delta;
            Phaser.Math.Clamp(this.photonCharger, 0, this.photonChargeTime);
        }

        let keys:Phaser.Input.Keyboard.CursorKeys = this.scene.input.keyboard.createCursorKeys();

        this.setAngularVelocity(0);
        this.setAcceleration(0,0);

        if (keys.left.isDown) {
            this.setAngularVelocity(-this.angularVelocity);
        }
        if (keys.right.isDown) {
            this.setAngularVelocity(this.angularVelocity); // degrees/s
            //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#setAngularVelocity
        }
        if (keys.up.isDown) {
            let facingY:number = -Math.cos(this.rotation);
            let facingX:number = Math.sin(this.rotation);
            this.setAcceleration(facingX*this.progradeAccel, facingY*this.progradeAccel); // pixels/s^2
        }
        if (keys.down.isDown) {
            let facingY:number = -Math.cos(this.rotation);
            let facingX:number = Math.sin(this.rotation);
            this.setAcceleration(-facingX*this.retrogradeAccel, -facingY*this.retrogradeAccel); // pixels/s^2
        }
        if(keys.space.isDown) {
            if(this.photonCharger >= this.photonChargeTime) {
                this.photonCharger = 0;
                let photon:Photon = new Photon(this.scene, this.x, this.y, Constants.kPhotonImage);
                photon.setVelocity(200,200);
                this.scene.add.existing(photon);
                this.scene.physics.add.existing(photon);
            }
        }

        this.scene.physics.world.wrapObject(this);
    }
}