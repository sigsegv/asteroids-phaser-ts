import * as Phaser from 'phaser';
import { Player } from './player';
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

        player = new Player(this, 200, 200, kPlayerShipImage);
    }

    update(time:number, delta:number) {
        
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