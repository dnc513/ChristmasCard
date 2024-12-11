let screen = 0;
let y = -20;
let x = 200;
let speed = 2;
let score = 0;
let boxWidth = 20;
let boxHeight = 20;
let boxColor;
let snowflakes = [];

function setup() {
    createCanvas(600, 400);
    pickRandom();
}

function draw() {
    background(30, 20, 80);
    createSnowflakes();
    updateSnowflakes();

    if (screen === 0) {
        startScreen();
    } else if (screen === 1) {
        gameOn();
    } else if (screen === 2) {
        endScreen();
    }
}

function createSnowflakes() {
    if (frameCount % 5 === 0) {
        let x = random(width);
        let size = random(2, 5);
        let speed = random(1, 3);
        snowflakes.push({ x, y: 0, size, speed });
    }
}

function updateSnowflakes() {
    noStroke();
    fill(255);
    for (let i = snowflakes.length - 1; i >= 0; i--) {
        let flake = snowflakes[i];
        ellipse(flake.x, flake.y, flake.size);
        flake.y += flake.speed;

        if (flake.y > height) {
            snowflakes.splice(i, 1);
        }
    }
}

function startScreen() {
    fill(255);
    textAlign(CENTER);
    textSize(16);
    text("Santa's presents are falling from the sky!\nUse the basket to collect your gifts", width / 2, height / 2 - 30);
    text('CLICK TO START', width / 2, height / 2 + 50);
    reset();
}

function gameOn() {
    fill(255);
    textSize(16);
    text("PRESENT = " + score, 50, 20);

    fill(boxColor);
    rect(x, y, boxWidth, boxHeight);

    rectMode(CENTER);
    fill(99, 73, 36);
    quad(
        mouseX + 30, height - 10,
        mouseX - 30, height - 10,
        mouseX - 50, height - 40,
        mouseX + 50, height - 40
    );

    y += speed;

    if (y > height - 30 && x > mouseX - 50 && x < mouseX + 50) {
        y = -20;
        speed += 0.5;
        score++;
        pickRandom();
    }


    if (y > height) {
        screen = 2;
    }
}

function pickRandom() {
    x = random(20, width - 20);
    boxWidth = random(20, 50); 
    boxHeight = random(20, 50);
    boxColor = color(random(255), random(255), random(255));
}

function endScreen() {
    fill(255);
    textAlign(CENTER);
    textSize(16);

    if (score >= 15) {
        text("CONGRATS!\nYou collected all the gifts!", width / 2, height / 2 - 30);
        text("PRESENT = " + score, width / 2, height / 2 + 20);
        text('Click to play again', width / 2, height / 2 + 60);
    } else {
        text("You failed to collect enough gifts!", width / 2, height / 2 - 30);
        text("PRESENT = " + score, width / 2, height / 2 + 20);
        text('Click to play again', width / 2, height / 2 + 60);
    }
}

function mousePressed() {
    if (screen === 0) {
        screen = 1;
    } else if (screen === 2) {
        screen = 0;
        reset();
    }
}

function reset() {
    score = 0;
    speed = 2;
    y = -20;
    pickRandom();
}
