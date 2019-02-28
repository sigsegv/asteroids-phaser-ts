import * as Phaser from 'phaser';
import * as Constants from './constants';

export class AsteroidSmall extends Phaser.Physics.Arcade.Image
{
    constructor(scene:Phaser.Scene, x:number, y:number) {
        super(scene, x, y, Constants.kAsteroidSmallImage);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    preUpdate(time:number, delta:number) {
        this.scene.physics.world.wrapObject(this);
    }
}