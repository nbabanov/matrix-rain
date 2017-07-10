'use strict';

const Trail = require('./Trail');
const Color = require('./Color');

class Background {
    /**
     * Default constructor
     * @param {number} fontSize
     */
    constructor(fontSize) {
        this.canvas = document.getElementById('background');
        this.ctx = this.canvas.getContext("2d");

        //making the canvas full screen
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;


        let charset = 'ABG67HIlmopJK)[{nL$%^MN34OZabQcCDxyEF]de89f<ghijkqrstuPRSTUVWXYvwz0125!#&*(}>\|`~\'"';

        //converting the string into an array of single characters
        this.charset = charset.split('');
        this.fontSize = fontSize;


        this.columns = this.canvas.width / this.fontSize; //number of columns for the rain
        //an array of drops - one per column
        this.trails = [];
        //x below is the x coordinate
        //1 = y co-ordinate of the drop(same for every drop initially)
        // this.columns = 1;
        for (let i = 0; i < this.columns; i++) {
            this.trails[i] = new Trail(this.canvas, this.ctx, this.charset, new Color(0, 255, 0), `bold ${this.fontSize}px TheMatrix`, this.fontSize, i);
        }

        //drawing the characters
        window.addEventListener('resize', this.recalculateDimentions.bind(this));

        this.now = null;
        this.fps = 60;
        this.then = null;
        this.elapsed = null;

        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.animate();
    }

    /**
     * On resize recalculates the BG dimensions
     */
    recalculateDimentions() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        let columns = this.canvas.width / this.font_size; //number of columns for the rain

        if (this.columns >= columns) {
            this.columns = columns
        } else {
            for (let i = this.columns; i < columns; i++) {
                this.trails[i] = new Trail(this.canvas, this.ctx, this.charset, new Color(0, 255, 0), `bold ${this.fontSize}px TheMatrix`, this.fontSize, i);
            }
            this.columns = columns;
        }
    }

    /**
     * Animates the falling characters
     */
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

    /**
     * Animates every single rain trail
     */
    draw() {
        //looping over trails
        for (let trail of this.trails) {
            trail.animate();
        }

    }
}

module.exports = Background;