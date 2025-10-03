import * as PIXI from "pixi.js";
import animals from "./assets/animals.png";
import animalMeta from "./assets/animals.json";

(async () => {
    const app = new PIXI.Application({
        // width: 256,
        // height: 256,
        resizeTo: window
    });

    //@ts-ignore
    globalThis.__PIXI_APP__ = app;
    document.body.appendChild(app.view);

    const rectangle = new PIXI.Graphics();

    rectangle.beginFill(0x66CCFF);
    rectangle.lineStyle({width: 4, color: 0xFF3300, alpha: 1});
    rectangle.drawRect(0, 0, 100, 100);
    rectangle.endFill();

    app.stage.addChild(rectangle);

    const rec2 = new PIXI.Graphics();

    rec2.beginFill(0xffffff);
    rec2.drawRect(110, 110, 50, 50);
    rec2.endFill();

    app.stage.addChild(rec2);

    const circle = new PIXI.Graphics();

    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 32);
    circle.endFill();

    circle.x = 32;
    circle.y = 150;

    app.stage.addChild(circle);

    const ellipse = new PIXI.Graphics();
    ellipse.beginFill(0xFFFF00);
    ellipse.drawEllipse(0, 0, 30, 20);
    ellipse.endFill();
    ellipse.x = 220;
    ellipse.y = 130;
    app.stage.addChild(ellipse);

    // LINE
    const line = new PIXI.Graphics();
    line.lineStyle({width: 4, color: 0xFFFFFF, alpha: 1});
    line.moveTo(50, 15);
    line.lineTo(180, 150);
    line.x = 32;
    line.y = 32;
    app.stage.addChild(line);

    // const message = new Text("Hello there!");
    // app.stage.addChild(message);
})()