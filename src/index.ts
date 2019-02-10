import * as Phaser from 'phaser';
declare function require(name:string):any;

var splashScreenImageUrl = require('../assets/logo-download-vector.png');
var playerShipUrl = require('../assets/playerShip1_green.png');

let kSplashScreenImage: string = 'splash';
let kPlayerShipImage: string = 'player';

let player: Phaser.Physics.Arcade.Image;

class SceneSplashScreen extends Phaser.Scene
{
    preload() {
        console.log('scene preload');
        this.load.image(kSplashScreenImage, splashScreenImageUrl);
        this.load.image(kPlayerShipImage, playerShipUrl);
    }

    create() {
        console.log('scene create');
        this.add.image(0,0,kSplashScreenImage).setOrigin(0,0);

        player = this.physics.add.image(200,200,kPlayerShipImage);
    }

    update() {
        let angularVelocity:number = 180;
        let progradeAccel:number = 200;
        let retrogradeAccel:number = 50;

        let keys:Phaser.Input.Keyboard.CursorKeys = this.input.keyboard.createCursorKeys();

        player.setAngularVelocity(0);
        player.setAcceleration(0,0);

        if (keys.left.isDown)
        {
            player.setAngularVelocity(-angularVelocity);
        }
        if (keys.right.isDown)
        {
            player.setAngularVelocity(angularVelocity); // degrees/s
            //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#setAngularVelocity
        }
        if (keys.up.isDown)
        {
            let facingY:number = -Math.cos(player.rotation);
            let facingX:number = Math.sin(player.rotation);
            player.setAcceleration(facingX*progradeAccel, facingY*progradeAccel); // pixels/s^2
        }
        if (keys.down.isDown)
        {
            let facingY:number = -Math.cos(player.rotation);
            let facingX:number = Math.sin(player.rotation);
            player.setAcceleration(-facingX*retrogradeAccel, -facingY*retrogradeAccel); // pixels/s^2
        }
    }
}

window.onload = () => {
    let gameconfig : GameConfig = { 
        parent:'content',
        scene: SceneSplashScreen,
        physics: {
            default:'arcade'
        }
    };
    this.game = new Phaser.Game(gameconfig);
};