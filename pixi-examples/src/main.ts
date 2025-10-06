import * as PIXI from "pixi.js";
import trsHunter from './assets/treasureHunter.png';
import trsHunterMeta from './assets/treasureHunter.json';
import {Blobs} from './components/Blobs/Blobs.ts'
import {HealthBar} from "./components/HealthBar.ts";

//GLOBAL
let state, dungeon, door, blobs, explorer: PIXI.Sprite, treasure, gameScene, gameOverScene, healtBar, message;

// SETUP
(async function setup() {
    const app = new PIXI.Application({
        width: 512,
        height: 512,
        antialias: true,
        resolution: 1
    });

    //@ts-ignore
    globalThis.__PIXI_APP__ = app;
    document.body.appendChild(app.view);


    const spritesheet = new PIXI.Spritesheet(PIXI.BaseTexture.from(trsHunter), trsHunterMeta);
    await spritesheet.parse();

    dungeon = new PIXI.Sprite(spritesheet.textures['dungeon.png']);
    door = new PIXI.Sprite(spritesheet.textures['door.png']);
    explorer = new PIXI.Sprite(spritesheet.textures['explorer.png']);
    treasure = new PIXI.Sprite(spritesheet.textures['treasure.png']);


    state =  {};

    gameScene = new PIXI.Container();
    gameOverScene = new PIXI.Container();

    app.stage.addChild(gameScene);
    app.stage.addChild(gameOverScene);

    gameScene.addChild(dungeon);

    door.position.set(32, 0);
    gameScene.addChild(door);

    explorer.x = 68;
    explorer.y = gameScene.height  / 2 - explorer.height / 2;
    explorer.vx = 0;
    explorer.vy = 0;
    // gameScene.addChild();

    treasure.x = gameScene.width - treasure.width - 48;
    treasure.y = gameScene.height / 2 - treasure.height / 2;
    gameScene.addChild(...[explorer, treasure]);

    blobs = new Blobs(6, spritesheet.textures['blob.png'], app.stage);
    gameScene.addChild(...blob.getBlobs());


    healtBar = new HealthBar(app.stage);
    gameScene.addChild(healtBar.healthBar);
    healtBar.setHealbar();

    const style = new PIXI.TextStyle({
        fontFamily: "Futura",
        fontSize: 64,
        fill: "white"
    });

    message = new PIXI.Text("The End!", style);
    message.x = 120;
    message.y = app.stage.height / 2 - 32;
    gameOverScene.addChild(message);

    gameScene.visible = true;
    gameOverScene.visible = false;


    // app.ticker.add((delta) => gameLoop(delta));

})();

// function gameLoop(delta) {
//     //Runs the current game `state` in a loop and renders the sprites
// }
//
function play(delta) {
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;

    contain(explorer, {x: 28, y: 10, width: 488, height: 480});
}

function contain(sprite: PIXI.Sprite, container: { x: any; y: any; width: any; height: any; }) {

    let collision = undefined;

    //Left
    if (sprite.x < container.x) {
        sprite.x = container.x;
        collision = "left";
    }

    //Top
    if (sprite.y < container.y) {
        sprite.y = container.y;
        collision = "top";
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        collision = "right";
    }

    //Bottom
    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height;
        collision = "bottom";
    }

    //Return the `collision` value
    return collision;
}

// @ts-ignore
blobs.forEach(function(blob) {

    //Move the blob
    blob.y += blob.vy;

    //Check the blob's screen boundaries
    const blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});

    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
        blob.vy *= -1;
    }

    // if (hitTestRectangle(explorer, blob)) {
    //     explorerHit = true;
    // }
});


//
// function end() {
//     //All the code that should run at the end of the game
// }