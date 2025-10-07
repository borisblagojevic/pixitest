// @ts-nocheck

import {Sprite, type Texture} from "pixi.js";

export class Blobs {

    public pop: number;
    public spacing: number = 48;
    public xOffset: number = 150;
    public speed: number = 2;
    public direction: number = 1;

    private blobs: any[] = [];


    getBlobs(): any[] {
        return this.blobs;
    }

    constructor(pop: number = 6, texture:Texture, stage:any )
    {
        this.pop = pop;

        if(texture === null)
            console.error("Texture can't be undefined");

        for (let i = 0; i < this.pop; i++)
        {

            const blob = new Sprite(texture);
            blob.x =  this.spacing * i + this.xOffset;
            blob.y = this.randomInt(0, stage.height - blob.height);

            blob.vy = this.speed * this.direction;
            this.direction *= -1;

            this.blobs.push(blob);
        }
    }

    randomInt(min:number, max: number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}