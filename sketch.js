let video;
let segmenter;
let segmentation;
let bgImg;  
let isModelReady = false;

function preload() {
  // Load background image (you can replace with your own path)
  bgImg = loadImage('assets/Edvard_Munch_The_Scream.jpeg');
}

function setup() {
  // Create canvas
  createCanvas(480, 600);
  // Create save button
  let saveBtn = createButton('💾 Save your scream');
  saveBtn.position(10, 10); // Position
  saveBtn.mousePressed(saveSnapshot);
  
  // Video settings
  let constraints = {
    video: {
      width: 100,    // Width
      height: 100    // Height
    },
    audio: false
  };

  video = createCapture(constraints);
  video.size(100, 100);
  video.hide();

  // Load UNet real-time person segmentation model
  segmenter = ml5.uNet('person', modelReady);
}

// Model callback
function modelReady() {
  console.log('✅ Model loaded!');
  isModelReady = true;
}

function draw() {
  // Background image
  //background(bgImg);
  //perlin noise 3
  let dynamicStrength = 30 + sin(frameCount * 0.02) * 15;
  drawWavyBackground(bgImg, dynamicStrength, 0.02);

  if (isModelReady) {
    segmenter.segment(video, gotResult);
  }

  if (segmentation) {
    image(segmentation.backgroundMask, 50, 200, 400, 400);
  }
  
  drawStatusText();

applyPixelation(10);


}

function applyPixelation(pixelSize) {
  // Create a smaller temporary canvas
  let smallGraphics = createGraphics(width / pixelSize, height / pixelSize);
  smallGraphics.noSmooth();

  // Draw the current frame onto the smaller canvas
  smallGraphics.image(get(), 0, 0, smallGraphics.width, smallGraphics.height);

  // Then scale it back up to create the pixelation effect
  noSmooth();
  image(smallGraphics, 0, 0, width, height);
  smooth();
}

// Do not modify this section
function gotResult(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  segmentation = result;
}

// Screenshot function
function saveSnapshot() {
  saveCanvas('myCanvas', 'png');
}

// "I forget ddl" text style
function drawStatusText() {
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("I forgot ddl", width / 2, height * 1 / 4);
}

//perlin noise 3
// 🌀 Perlin Noise 垂直流动背景（瀑布效果）
let yoff = 0; // 时间偏移量

function drawWavyBackground(img, waveStrength = 20, noiseScale = 0.02) {
  let pg = createGraphics(width, height);
  pg.loadPixels();
  img.loadPixels();

  for (let x = 0; x < width; x++) {
    // 使用 Perlin noise 计算每一列的垂直偏移量
    let yOffset = noise(x * noiseScale, yoff) * waveStrength - waveStrength / 2;
    // 获取原图中这一列的像素
    let col = img.get(x, 0, 1, height);
    // 把整列稍微上下偏移，形成竖直流动感
    pg.image(col, x, yOffset);
  }

  yoff += 0.01; // 时间推进，形成动态流动
  image(pg, 0, 0, width, height);
}