// @ts-nocheck

import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});

const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');

app.stage.addChild(bunny);

bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.ticker.add((delta) => {
    // console.log(delta);
    bunny.x += (Math.random() * 5) * delta;

    if (bunny.x === 1000) {
        console.log('HH')
        bunny.x = 0;
    }
    // console.log(bunny.x)
});
//
// bunny.on('keydown ', () => {
//     console.log('a')
//     bunny.x = 100;
//
// })
// bunny.eventMode = 'static';


document.body.appendChild(app.view);