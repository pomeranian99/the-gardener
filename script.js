var tempFlowerCount = 0;

var openScreen = true;
var canva = 60; // number of rows and columns
var cellSize = 5; // size of each cell //
var flowerList = [];
var mainLocX = (canva * cellSize) / 2; // starting position
var mainLocY = (canva * cellSize) / 2; // starting position
var plantingWait = 13; // how many moves before the planter plants
var plantingWaitCount = 0; // start the planting wait counter ...
var planterMoveWait = 800; // how long the planter waits before moving
var planterAlpha = 255;
var planterAlphaDir = -1;
var planterMoveDir = Math.floor(Math.random() * 8); // initial direction for planter moving
var planterChangeDirWait = 4;
var planterChangeCount = 0;
var planterMoves = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

var letters = [
  [
    // T
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [
    // H
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  [
    // E
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  [
    // G
    [0, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
  ],
  [
    // A
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  [
    // R
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1]
  ],
  [
    // D
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0]
  ],
  [
    // N
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  [
    // R
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1]
  ],
  [
    // U 
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
  ],
  [
    // arrow icon 
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 0, 0]
  ]
]

var timeNow = 0;

function setup() {
  if (screen.width > 680) {
    cellSize = 10;
  }
  createCanvas(canva * cellSize, canva * cellSize);
  timeNow = millis(); // starting time for entire simulation
}

function draw() {
  clear();
  background(0);
  noStroke();
  fill(51, 119, 255, planterAlpha);

  // pulse the planter's alpha
  planterAlpha += planterAlphaDir * 3;
  if (planterAlphaDir < 0 && planterAlpha < 120) {
    planterAlphaDir = planterAlphaDir * -1;
  }
  if (planterAlphaDir > 0 && planterAlpha > 254) {
    planterAlphaDir = planterAlphaDir * -1;
  }

  // if it's time to move the planter ...
  if (millis() - timeNow > planterMoveWait) {
    // move the planter
    mainLocX = mainLocX + planterMoves[planterMoveDir][0] * cellSize;
    mainLocY = mainLocY + planterMoves[planterMoveDir][1] * cellSize;

    // if we've moved off the edge, wrap around
    if (mainLocX > (canva - 1) * cellSize) {
      mainLocX = 0;
    }
    if (mainLocX < 0) {
      mainLocX = (canva - 1) * cellSize;
    }
    if (mainLocY > (canva - 1) * cellSize) {
      mainLocY = 0;
    }
    if (mainLocY < 0) {
      mainLocY = (canva - 1) * cellSize;
    }

    // add to the countdown for the next change of direction
    planterChangeCount += 1;

    // reset the counter to wait for the next move
    timeNow = millis();

    // if it's time to pick a new direction, pick a new direction
    if (planterChangeCount > planterChangeDirWait) {
      planterMoveDir = Math.floor(Math.random() * 8);
      planterChangeCount = 0;
    }

    // add one tick to the planting waiting counter
    plantingWaitCount += 1;

    // if it's time to plant ..
    if (plantingWaitCount > plantingWait) {
      flowerList.push(new flower(mainLocX, mainLocY));
      plantingWaitCount = 0;
    }
  } // end of loop that activates whenever the planter moves

  // show the planter
  rect(mainLocX, mainLocY, cellSize, cellSize);
  // show the flowers
  for (let q = 0; q < flowerList.length; q++) {
    // draw the center red pixel
    noStroke();
    fill(255, 0, 0);
    rect(flowerList[q].x, flowerList[q].y, cellSize, cellSize);

    let inX = flowerList[q].x - cellSize * 2;
    let inY = flowerList[q].y - cellSize * 2;

    // draw the outer ring
    fill(flowerList[q].outerR, flowerList[q].outerG, flowerList[q].outerB, 150);
    for (let h = 0; h < flowerList[q].outerPattern.length; h++) {
      for (let i = 0; i < flowerList[q].outerPattern[h].length; i++) {
        if (flowerList[q].outerPattern[h][i] === 1) {
          rect(inX + i * cellSize, inY + h * cellSize, cellSize, cellSize);
        }
      }
    }

    // draw the inner ring
    fill(flowerList[q].innerR, flowerList[q].innerG, flowerList[q].innerB, 180);
    for (let f = 0; f < flowerList[q].innerPattern.length; f++) {
      for (let g = 0; g < flowerList[q].innerPattern[f].length; g++) {
        if (flowerList[q].innerPattern[f][g] === 1) {
          rect(inX + g * cellSize, inY + f * cellSize, cellSize, cellSize);
        }
      }
    }
  }
} // end of draw() function here

function flower(x, y) {
  let flowerInner = [
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  ];
  let flowerOuter = [
    [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
    [
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
    ],
    [
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
    ],
    [
      [0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 1, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
    ],
    [
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
    ],
  ];

  let colors = [
    [255, 0, 0],
    [255, 85, 0],
    [255, 128, 0],
    [255, 170, 0],
    [255, 213, 0],
    [255, 255, 0],
    [212, 255, 0],
    [170, 255, 0],
    [128, 255, 0],
    [85, 255, 0],
    [43, 255, 0],
    [0, 255, 85],
    [0, 255, 170],
    [0, 255, 255],
    [0, 213, 255],
    [0, 170, 255],
    [0, 128, 255],
    [0, 85, 255],
    [0, 42, 255],
    [0, 0, 255],
    [43, 0, 255],
    [85, 0, 255],
    [128, 0, 255],
    [170, 0, 255],
    [212, 0, 255],
    [255, 0, 255],
    [255, 0, 212],
    [255, 0, 170],
    [255, 0, 128],
    [255, 0, 85],
    [255, 0, 43],
  ];

  this.x = x;
  this.y = y;
  // pick a random pattern for the inside of the flower
  this.innerPattern =
    flowerInner[Math.floor(Math.random() * flowerInner.length)];
  // ... and one for the outside of the flower
  this.outerPattern =
    flowerOuter[Math.floor(Math.random() * flowerOuter.length)];
  // then a color for the inside ...
  let innerColorSet = colors[Math.floor(Math.random() * colors.length)];
  this.innerR = innerColorSet[0];
  this.innerG = innerColorSet[1];
  this.innerB = innerColorSet[2];
  // ... and outside
  let outerColorSet = colors[Math.floor(Math.random() * colors.length)];
  this.outerR = outerColorSet[0];
  this.outerG = outerColorSet[1];
  this.outerB = outerColorSet[2];
}


