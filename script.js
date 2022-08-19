var tempFlowerCount = 0;

var sound = new Howl({
  src: ['https://cdn.glitch.global/b217ffbd-8d12-4057-9ea4-22f341ae632e/the-gardener.mp3?v=1660938039843'],
  autoplay: true,
  loop: true,
  volume: 0.5,
  // onend: function() {
  //   console.log('Finished!');
  // }
});

var soundYetToPlay = true;
var openScreen = true;
var canva = 60; // number of rows and columns
var cellSize = 5; // size of each cell //
var flowerList = [];
var mainLocX; // starting position, as yet undeclared
var mainLocY; // starting position, as yet undeclared
// var mainLocX = (canva * cellSize) / 2; // starting position
// var mainLocY = (canva * cellSize) / 2; // starting position
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

var colors = [
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
  
var openerColors = [
  [139,69,19],
  [165,42,42],
  [210,105,30],
  [210,105,30]
];

var colorCount = 0;

var opener = [
  ["space", "space", "t", "h", "e", "space", "space", "space"],
  ["g", "a", "r", "d", "e", "n", "e", "r"],
  ["space", "space", "space", "space", "space", "space", "space", "space"],
  ["space", "s", "t", "a", "r", "t", "space", "arrow"],
];

var letters = {
  t: [
    [0, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  h: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  e: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  g: [
    [0, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  a: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  d: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  n: [
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  r: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  u: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  arrow: [
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 0, 0],
  ],
  s: [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  space: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
};

var timeNow = 0;

function setup() {
  // frameRate(2);
  if (screen.width > 680) {
    cellSize = 10;
  }
  createCanvas(canva * cellSize, canva * cellSize);
  mainLocX = (canva * cellSize) / 2;
  mainLocY = (canva * cellSize) / 2;
  timeNow = millis(); // starting time for entire simulation
  background(0);
  
  
  let xPos = 10 * cellSize;
  let yPos = 15 * cellSize;
  // get each line of the opener. "p" is each line, "q" is each character
  for (let p = 0; p < opener.length; p++) {
    // go character by character through the line
    for (let q = 0; q < opener[p].length; q++) {
      // get the array for this letter ...
      let letterArray = letters[opener[p][q]];
      // ... then iterate through it
      for (let r = 0; r < letterArray.length; r++) {
        for (let s = 0; s < letterArray[r].length; s++) {
          if (letterArray[r][s] == 1) {
            fill(openerColors[colorCount][0], openerColors[colorCount][1], openerColors[colorCount][2]);
            rect(xPos, yPos, cellSize, cellSize);
            xPos += cellSize;
          } else {
            xPos += cellSize;
          }
        } // end of loop printing one row of a single character, so we ... 
        // ... move down one cell, and back to the beginning of the character location ...
        xPos = xPos - 4 * cellSize;
        yPos += cellSize;
      } // end of the loop printing one character, so ...
      // ... when the character is done, move the cursor up to where the next letter will begin. Add an extra cell of x-axis space between letters ...
      yPos = yPos - (5 * cellSize);
      xPos = xPos + (4 * cellSize) + cellSize;
    } // end of function reading characters in a line
    // at end of a line of text, set xPos go back to beginning of the text lines; yPos goes down by two cell sizes
    xPos = 10 * cellSize;
    yPos += cellSize * 7;
    colorCount++;
  } // end of function reading line by line in the message
}

function draw() {
  if (mouseIsPressed) {
    openScreen = false;
    if (soundYetToPlay) {
      sound.play;
      soundYetToPlay = false;
    }
  };
  
  // start with the open screen, don't run the main logic unless they click
  if (openScreen == true) {
  } else {
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
      fill(
        flowerList[q].outerR,
        flowerList[q].outerG,
        flowerList[q].outerB,
        150
      );
      for (let h = 0; h < flowerList[q].outerPattern.length; h++) {
        for (let i = 0; i < flowerList[q].outerPattern[h].length; i++) {
          if (flowerList[q].outerPattern[h][i] === 1) {
            rect(inX + i * cellSize, inY + h * cellSize, cellSize, cellSize);
          }
        }
      }

      // draw the inner ring
      fill(
        flowerList[q].innerR,
        flowerList[q].innerG,
        flowerList[q].innerB,
        180
      );
      for (let f = 0; f < flowerList[q].innerPattern.length; f++) {
        for (let g = 0; g < flowerList[q].innerPattern[f].length; g++) {
          if (flowerList[q].innerPattern[f][g] === 1) {
            rect(inX + g * cellSize, inY + f * cellSize, cellSize, cellSize);
          }
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

  
  /* 
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
  
  */

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


