// @ts-nocheck

import * as PIXI from "pixi.js";

export class HealthBar
{
    public healthBar;

    constructor(stage: PIXI.Container<PIXI.DisplayObject>) {
        //HealtBar
        this.healthBar = new PIXI.Container();
        this.healthBar.position.set(stage.width - 170, 4);

        const innerBar = new PIXI.Graphics();
        innerBar.beginFill(0x000000)
        innerBar.drawRect(0, 0, 128, 8);
        innerBar.endFill();
        this.healthBar.addChild(innerBar);

        const outerBar = new PIXI.Graphics();
        outerBar.beginFill(0xFF3300);
        outerBar.drawRect(0, 0, 128, 8);
        outerBar.endFill();
        this.healthBar.addChild(outerBar)

        this.healthBar.outer = outerBar;
    }

    setHealbar() {
        this.healthBar.outer.width -= 30;
    }
}
