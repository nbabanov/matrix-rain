class Drop {
    constructor(canvas, context, charset, fillColor, font, fontSize, x, y, lifeSpan) {
        this.canvas = canvas;
        this.context = context;
        this.charset = charset;
        this.fillColor = fillColor;
        this.font = font;
        this.fontSize = fontSize;
        this.x = x;


        this.now = null;
        this.fps = 30;
        this.then = null;
        this.elapsed = null;
        this.fpsInterval = 1000 / fps;

        this.resetTrail();
    }

    resetTrail() {
        this.y = Trail.calcStartPosition();
        this.speed = Trail.calcSpeed(this.x, this.y, this.fontSize);
    }

    animate() {
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
        this.context.fillStyle = this.fillColor.toString();
        this.context.font = this.font;
        this.context.shadowBlur = 10;
        // this.context.shadowColor = 'green';

        let text = this.charset[Math.floor(Math.random() * this.charset.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        this.context.fillText(text, this.x * this.fontSize, this.y * this.fontSize);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (this.y * this.fontSize > this.canvas.height && Math.random() > 0.975) {
            this.resetTrail();
        }

        //incrementing Y coordinate
        this.y++;
    }
}