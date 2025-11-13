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
  //perlin noise 2
  drawWavyBackground(bgImg, 200, 0.02);

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

//perlin noise 2
let yoff = 0; // 噪声随时间推进

function drawWavyBackground(img, waveStrength = 15, noiseScale = 0.02) {
  // 在一个离屏画布中绘制扭曲后的背景
  let pg = createGraphics(width, height);
  pg.loadPixels();
  img.loadPixels();

  for (let y = 0; y < height; y++) {
    // 使用 Perlin noise 计算这一行的水平偏移量
    let xOffset = noise(y * noiseScale, yoff) * waveStrength - waveStrength / 2;
    // 把原背景的这一行取出并在偏移后绘制
    let row = img.get(0, y, width, 1);
    pg.image(row, xOffset, y);
  }

  yoff += 0.01; // 时间偏移（动画推进）
  image(pg, 0, 0, width, height); // 绘制最终扭曲背景
}