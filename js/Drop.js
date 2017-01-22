'use strict';

const Color = require('./Color');

class Drop {
    constructor(canvas, context, charset, fillColor, font, fontSize, x, y, lifeSpan) {
        this.canvas = canvas;
        this.context = context;
        this.charset = charset;
        this.fillColor = fillColor;
        this.font = font;
        this.fontSize = fontSize;
        this.x = x;
        this.y = y;
        this.lifeSpan = lifeSpan;

        this._isDead = false;
        this.onDeathSubs = [];


        this.startTime = null;
        this.now = null;
        this.fps = 10;
        this.then = null;
        this.elapsed = null;
        this.fpsInterval = 1000 / this.fps;

        let fpsCount = (this.lifeSpan / 1000) * this.fps;

        this.fadeAmount = new Color(
            fillColor.r / fpsCount,
            fillColor.g / fpsCount,
            fillColor.b / fpsCount,
            0
        );
    }

    onDeath(callback) {
        this.onDeathSubs.push(callback);
    }

    setIsDead(value) {
        this._isDead = value;

        if (value == true) {
            for (let sub of this.onDeathSubs) {
                sub();
            }
        }
    }

    getIsDead() {
        return this._isDead;
    }

    animate() {
        if (this.startTime == null) {
            this.startTime = Date.now();
        }

        if (this.then == null) {
            this.then = Date.now();
        }

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        // if enough time has elapsed, draw the next frame

        if (this.elapsed > this.fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = this.now - (this.elapsed % this.fpsInterval);

            // Put your drawing code here
            if (!this.getIsDead()) {
                this.draw();
            }

        }
    }

    draw() {
        //Clear last drop
        this.context.fillStyle = 'black';
        this.context.shadowBlur = 0;
        this.context.shadowColor = 'black';
        this.context.fillRect(this.x * this.fontSize - 10, this.y * this.fontSize - this.fontSize, this.fontSize + 10, this.fontSize + 2);

        //Paint new one
        this.context.fillStyle = this.fillColor.toString();
        this.context.font = this.font;
        this.context.shadowColor = this.fillColor.toString();

        let text = this.charset[Math.floor(Math.random() * this.charset.length)];

        this.context.fillText(text, this.x * this.fontSize, this.y * this.fontSize);

        if (this.fillColor.r == 0 && this.fillColor.g == 0 && this.fillColor.b == 0) {
            this.setIsDead(true);
        }

        this.fillColor.subtract(this.fadeAmount);
    }
}

module.exports = Drop;