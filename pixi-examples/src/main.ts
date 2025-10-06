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

    const blobGroup = new Blobs(6, spritesheet.textures['blob.png'], app.stage);
    gameScene.addChild(...blobGroup.getBlobs());
    blobs = blobGroup.getBlobs();

    healtBar = new HealthBar(app.stage);
    gameScene.addChild(healtBar.healthBar);

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

    const playAgain = new PIXI.Text("Play Again? Press ENTER", new PIXI.TextStyle({
        fontFamily: "Futura",
        fontSize: 32,
        fill: "white"
    }));

    playAgain.x = app.stage.width / 2 - 180;
    playAgain.y = app.stage.height / 2 + 90;

    gameOverScene.addChild(playAgain);

    const left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40),
        enter = keyboard(13);

    left.press = function() {

        explorer.vx = -5;
        explorer.vy = 0;
    };

    left.release = function() {

        if (!right.isDown && explorer.vy === 0) {
            explorer.vx = 0;
        }
    };

    up.press = function() {
        explorer.vy = -5;
        explorer.vx = 0;
    };
    up.release = function() {
        if (!down.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    };

    right.press = function() {
        explorer.vx = 5;
        explorer.vy = 0;
    };
    right.release = function() {
        if (!left.isDown && explorer.vy === 0) {
            explorer.vx = 0;
        }
    };

    down.press = function() {
        explorer.vy = 5;
        explorer.vx = 0;
    };
    down.release = function() {
        if (!up.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    };

    enter.press = function() {
        if(state !== typeof play){
            window.location.reload()
        }
    }

    state = play;

    app.ticker.add((delta) => gameLoop(delta));

})();

function gameLoop(delta) {
    state(delta);
}

function play(delta) {

    explorer.x += explorer.vx;
    explorer.y += explorer.vy;

    contain(explorer, {x: 28, y: 10, width: 488, height: 480});

    let explorerHit = false;

    blobs.forEach(function(blob) {

        //Move the blob
        blob.y += blob.vy;

        const blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});


        if (blobHitsWall === "top" || blobHitsWall === "bottom") {
            blob.vy *= -1;
        }


        if (hitTestRectangle(explorer, blob)) {
            explorerHit = true;
        }
    });

    if (explorerHit) {

        explorer.alpha = 0.5;

        healtBar.healthBar.outer.width -= 1;

    } else {

        //Make the explorer fully opaque (non-transparent) if it hasn't been hit
        explorer.alpha = 1;
    }

    if (hitTestRectangle(explorer, treasure)) {

        treasure.x = explorer.x + 8;
        treasure.y = explorer.y + 8;
    }

    if (healtBar.healthBar.outer.width < 0) {
        state = end;
        message.text = "You lost!";
    }

    if (hitTestRectangle(treasure, door)) {
        state = end;
        message.text = "You won!";
    }
}

function end() {
    gameScene.visible = false;
    gameOverScene.visible = true;
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

    return collision;
}

function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occurring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
};

function keyboard(keyCode:number) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = function(event:Event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event: Event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);

    return key;
}
