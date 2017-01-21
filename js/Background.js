'use strict';

const Trail = require('./Trail');
const Color = require('./Color');

class Background {
    constructor(fontSize) {
        this.canvas = document.getElementById('background');
        this.ctx = this.canvas.getContext("2d");

        //making the canvas full screen
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;


        let charset = 'ABG67HIlmopJK)[{nL$%^MN34OZabQcCDxyEF]de89f<ghijkqrstuPRSTUVWXYvwz0125!#&*(}>\|`~\'"';
        // let chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
        //converting the string into an array of single characters
        this.charset = charset.split('');
        this.fontSize = fontSize;


        this.columns = this.canvas.width / this.fontSize; //number of columns for the rain
        //an array of drops - one per column
        this.drops = [];
        //x below is the x coordinate
        //1 = y co-ordinate of the drop(same for every drop initially)
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = new Trail(this.canvas, this.ctx, this.charset, new Color(0, 255, 0), `bold ${this.fontSize}px TheMatrix`, this.fontSize, i);
        }

        //drawing the characters

        window.addEventListener('resize', this.recalculateDimentions.bind(this));

        this.now = null;
        this.fps = 60;
        this.then = null;
        this.elapsed = null;

        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();


        this.animate();
    }

    recalculateDimentions() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        let columns = this.canvas.width / this.font_size; //number of columns for the rain

        if (this.columns >= columns) {
            this.columns = columns
        } else {
            for (let i = this.columns; i < columns; i++) {
                this.drops[i] = new Trail(this.canvas, this.ctx, this.charset, new Color(0, 255, 0), `bold ${this.fontSize}px TheMatrix`, this.fontSize, i);
            }
            this.columns = columns;
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // calc elapsed time since last loop

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
            this.draw();

        }

    }

    draw() {
        //Black BG for the canvas
        //translucent BG to show trail
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //looping over drops
        for (let drop of this.drops) {
            drop.animate();
        }

    }
}

module.exports = Background;