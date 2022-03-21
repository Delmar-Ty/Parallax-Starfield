let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let randomNumber = (min, max) => Math.random() * (max - min) + min;

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

let mouse = {
    x: undefined,
    y: undefined
}

let count = 1000;
let points = [];
let colors = [
    '#4F345A',
    '#5D4E6D',
    '#8FA998',
    '#9CBFA7',
    '#C9F299',
];

let init = () => {
    for (let i = 0; i < count; i++) {
        let z = randomNumber(1, 50);
        let size = (50 - z) / 10;
        let x = randomNumber(size, canvas.width - size);
        let y = randomNumber(size, canvas.height - size);
        points[i] = new Point(x, y, z, size);
        points[i].draw();
    }
}

init();

window.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < count; i++) {
        points[i].update();
    }
});

window.addEventListener('touchmove', function(e) {
    mouse.x = e.targetTouches[0].clientX;
    mouse.y = e.targetTouches[0].clientY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < count; i++) {
        points[i].update();
    }
});

function Point(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.xoff = 0;
    this.yoff = 0;
    this.color = colors[Math.floor(randomNumber(0, colors.length))];
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x + this.xoff, this.y + this.yoff, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    this.update = function() {
        this.xoff = ((mouse.x - this.x) / this.z) * -1;
        this.yoff = ((mouse.y - this.y) / this.z) * -1;
        this.draw();
    }
}