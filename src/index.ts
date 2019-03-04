import * as Phaser from 'phaser';
import { Player } from './player';
import * as Constants from './constants';
import { AsteroidSmall } from './asteroid';
declare function require(name:string):any;

var splashScreenImageUrl = require('../assets/logo-download-vector.png');
var playerShipUrl = require('../assets/playerShip1_green.png');
var photonUrl = require('../assets/laserRed06.png');
var asteroidSmallUrl = require('../assets/meteorGrey_small2.png');

let player: Phaser.Physics.Arcade.Image;
let physicsGroup: Phaser.Physics.Arcade.Group;

class SceneSplashScreen extends Phaser.Scene
{
    preload() {
        console.log('scene preload');
        this.load.image(Constants.kSplashScreenImage, splashScreenImageUrl);
        this.load.image(Constants.kPlayerShipImage, playerShipUrl);
        this.load.image(Constants.kPhotonImage, photonUrl);
        this.load.image(Constants.kAsteroidSmallImage, asteroidSmallUrl);

        this.events.on('addCollider', this.onAddCollider);
        this.events.on('removeCollider', this.onRemoveCollider);
    }

    create() {
        console.log('scene create');

        physicsGroup = this.physics.add.group();

        this.add.image(0,0,Constants.kSplashScreenImage).setOrigin(0,0);

        player = new Player(this, 200, 200);
        let asteroid: Phaser.Physics.Arcade.Image = new AsteroidSmall(this, 400, 400);

        physicsGroup.add(player);
        physicsGroup.add(asteroid);

        this.physics.add.collider(physicsGroup, physicsGroup, this.collisionCallback);

        asteroid.setVelocity(200,200);
        asteroid.setAngularVelocity(50);
    }

    update(time:number, delta:number) {
        
    }

    onAddCollider(obj: Phaser.GameObjects.GameObject) {
        physicsGroup.add(obj);
    }

    onRemoveCollider(obj: Phaser.GameObjects.GameObject) {
        physicsGroup.remove(obj);
    }

    collisionCallback(obj1:Phaser.GameObjects.GameObject, obj2:Phaser.GameObjects.GameObject) {
        obj1.emit('collision', obj2);
        obj2.emit('collision', obj1);
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