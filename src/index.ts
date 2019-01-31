import * as Phaser from 'phaser';
declare function require(name:string):any;
var splashScreenImage = require('../assets/logo-download-vector.png');

class SceneSplashScreen extends Phaser.Scene
{
    preload() {
        console.log('scene preload');
        this.load.image('splash', splashScreenImage);
    }

    create() {
        console.log('scene create');
        this.add.image(0,0,'splash').setOrigin(0,0);
    }

    update() {
        // console.log('scene update');
    }
}

window.onload = () => {
    let gameconfig : GameConfig = { 
        parent:'content',
        scene: SceneSplashScreen
    };
    this.game = new Phaser.Game(gameconfig);
};