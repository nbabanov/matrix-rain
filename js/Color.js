'use strict';

class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = typeof a != 'undefined' ? a : 1;
    }

    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }

    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        this.a += color.a;

        if (this.r > 255) {
            this.r = 255;
        } else if (this.r < 0) {
            this.r = 0;
        }

        if (this.g > 255) {
            this.g = 255;
        } else if (this.g < 0) {
            this.g = 0;
        }

        if (this.b > 255) {
            this.b = 255;
        } else if (this.b < 0) {
            this.b = 0;
        }

        if (this.a > 1) {
            this.a = 1;
        } else if (this.a < 0) {
            this.a = 0;
        }
    }

    subtract(color) {
        this.r -= color.r;
        this.g -= color.g;
        this.b -= color.b;
        this.a -= color.a;

        if (this.r > 255) {
            this.r = 255;
        } else if (this.r < 0) {
            this.r = 0;
        }

        if (this.g > 255) {
            this.g = 255;
        } else if (this.g < 0) {
            this.g = 0;
        }

        if (this.b > 255) {
            this.b = 255;
        } else if (this.b < 0) {
            this.b = 0;
        }

        if (this.a > 1) {
            this.a = 1;
        } else if (this.a < 0) {
            this.a = 0;
        }

        this.r = parseInt(this.r);
        this.g = parseInt(this.g);
        this.b = parseInt(this.b);
    }
}

module.exports = Color;