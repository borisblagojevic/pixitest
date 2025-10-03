import * as PIXI from "pixi.js";
import animalMeta from '../assets/animals.json';
import animals from '../assets/animals.png';


// Loading assets
(async () => {
    const app = new PIXI.Application({
        // width: 256,
        // height: 256,
        resizeTo: window
    });

//@ts-ignore
    globalThis.__PIXI_APP__ = app;

    document.body.appendChild(app.view);

    const spritesheet = new PIXI.Spritesheet(PIXI.BaseTexture.from(animals), animalMeta);

    await  spritesheet.parse();

    const cat = new PIXI.Sprite(spritesheet.textures['cat.png']);
    const hedgehog = new PIXI.Sprite(spritesheet.textures['hedgehog.png']);
    const tiger = new PIXI.Sprite(spritesheet.textures['tiger.png']);

    cat.position.set(16, 16);
    hedgehog.position.set(32, 32);
    tiger.position.set(64, 64);

    const anmC = new PIXI.Container();

    anmC.addChild(cat);
    anmC.addChild(hedgehog);
    anmC.addChild(tiger);

    console.log(anmC.width, anmC.height);
    app.stage.addChild(anmC);

})()



