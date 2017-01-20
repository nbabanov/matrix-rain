class Background {
    constructor() {
        this.canvas = document.getElementById('background');
        this.ctx = this.canvas.getContext("2d");

        //making the canvas full screen
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        //chinese characters - taken from the unicode charset
        let chinese = 'ABG67HIlmopJK)[{nL$%^MN34OZabQcCDxyEF]de89f<ghijkqrstuPRSTUVWXYvwz0125!#&*(}>\|`~\'"';
        // let chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
        //converting the string into an array of single characters
        this.charset = chinese.split('');

        this.font_size = 14;
        this.columns = this.canvas.width / this.font_size; //number of columns for the rain
        //an array of drops - one per column
        this.drops = [];
        //x below is the x coordinate
        //1 = y co-ordinate of the drop(same for every drop initially)
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -1000;
        }

        //drawing the characters

        window.addEventListener('resize', this.recalculateDimentions.bind(this));


        setInterval(this.draw.bind(this), 60);
    }

    recalculateDimentions() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        let columns = this.canvas.width / this.font_size; //number of columns for the rain

        if (this.columns >= columns) {
            this.columns = columns
        } else {
            for (let i = this.columns; i < columns; i++) {
                this.drops[i] = Math.random() * -1000;
            }
            this.columns = columns;
        }
    }

    draw() {
        //Black BG for the canvas
        //translucent BG to show trail
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0'; //green text
        this.ctx.font = `bold ${this.font_size}px TheMatrix`;

        //looping over drops
        for (let i = 0; i < this.drops.length; i++) {
            //a random chinese character to print
            let text = this.charset[Math.floor(Math.random() * this.charset.length)];
            //x = i*font_size, y = value of drops[i]*font_size
            this.ctx.fillText(text, i * this.font_size, this.drops[i] * this.font_size);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if (this.drops[i] * this.font_size > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            //incrementing Y coordinate
            this.drops[i]++;
        }

    }
}

module.exports = Background;