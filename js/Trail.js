'use strict';

const Noise = require('./Noise');
const Drop = require('./Drop');
const Color = require('./Color');

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

Noise.seed(Math.random());

class Trail {
    constructor(canvas, context, charset, fillColor, font, fontSize, x) {
        this.canvas = canvas;
        this.context = context;
        this.charset = charset;
        this.fillColor = fillColor;
        this.font = font;
        this.fontSize = fontSize;
        this.x = x;


        this.fps = 30;
        this.now = null;
        this.then = null;
        this.elapsed = null;

        this.fpsInterval = 1000 / this.fps;

        this.nowDrop = null;
        this.thenDrop = null;
        this.elapsedDrop = null;


        this.drops = [];

        this.resetTrail();
    }

    resetTrail() {
        // this.drops = [];
        this.y = Trail.calcStartPosition();
        this.speed = Trail.calcSpeed(this.x, this.y, this.fontSize);

        this.drops.push(new Drop(
            this.canvas,
            this.context,
            this.charset,
            new Color(this.fillColor.r, this.fillColor.g, this.fillColor.b),
            this.font,
            this.fontSize,
            this.x,
            this.y,
            10000)
        )
    }

    getDropFPSInterval() {
        return (this.fpsInterval) / this.speed;
    }

    static calcStartPosition() {
        return getRandomArbitrary(0, -10);
    }

    static calcSpeed(x, y, fontSize) {
        return Math.abs(Noise.perlin3(x, y, fontSize) * 2) + 0.2;
    }

    animate() {
        if (this.then == null && this.thenDrop == null) {
            this.then = Date.now();
            this.thenDrop = Date.now();
        }

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        this.nowDrop = Date.now();
        this.elapsedDrop = this.nowDrop - this.thenDrop;

        // if enough time has elapsed, draw the next frame
        if (this.elapsed > this.fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (this.elapsed % this.fpsInterval);

            // Put your drawing code here
            this.draw();
        }

        if (this.elapsedDrop > this.getDropFPSInterval()) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.thenDrop = this.nowDrop - (this.elapsedDrop % this.getDropFPSInterval());

            // Put your drawing code here
            this.moveTrail();
        }
    }

    draw() {
        for (let drop of this.drops) {
            drop.animate();
        }
    }

    moveTrail() {
        this.context.fillStyle = this.fillColor.toString();
        this.context.font = this.font;

        let newDropIndex = this.drops.push(new Drop(
                this.canvas,
                this.context,
                this.charset,
                new Color(this.fillColor.r, this.fillColor.g, this.fillColor.b),
                this.font,
                this.fontSize,
                this.x,
                this.y,
                1000)
            ) - 1;
        this.drops[newDropIndex].onDeath(() => {
            this.drops.shift();
        });

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (this.y * this.fontSize > this.canvas.height && Math.random() > 0.975) {
            this.resetTrail();
        }

        //incrementing Y coordinate
        this.y++;
    }
}

module.exports = Trail;