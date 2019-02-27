import * as Phaser from 'phaser';
import * as Constants from './constants';
import { Photon } from './photon';
import { Util }  from './util';

export class Player extends Phaser.Physics.Arcade.Image
{
    angularVelocity:number = 180;
    progradeAccel:number = 200;
    retrogradeAccel:number = 50;
    readonly photonChargeTime:number = 500; // in ms
    photonCharger:number = this.photonChargeTime;
    photonVelocity:number = 500;

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
            let facing:[number, number] = Util.facing(this.rotation);
            this.setAcceleration(facing[0]*this.progradeAccel, facing[1]*this.progradeAccel); // pixels/s^2
        }
        if (keys.down.isDown) {
            let facing:[number, number] = Util.facing(this.rotation);
            this.setAcceleration(-facing[0]*this.retrogradeAccel, -facing[1]*this.retrogradeAccel); // pixels/s^2
        }
        if(keys.space.isDown) {
            this.firePhoton();
        }

        this.scene.physics.world.wrapObject(this);
    }

    private firePhoton() {
        if(this.photonCharger >= this.photonChargeTime) {
            this.photonCharger = 0;
            let photon:Photon = new Photon(this.scene, this.x, this.y, Constants.kPhotonImage);
            this.scene.add.existing(photon);
            this.scene.physics.add.existing(photon);

            photon.setRotation(this.rotation);
            let facing:[number, number] = Util.facing(this.rotation);
            photon.setVelocity(facing[0] * this.photonVelocity, facing[1] * this.photonVelocity);
        }
    }
}