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
  //Canvas Creation
  createCanvas(480, 600);
  //Button creation
  let saveBtn = createButton('💾 Save your scream');
  saveBtn.position(10, 10);//Location
  saveBtn.mousePressed(saveSnapshot);
  
  //Video parameters
  let constraints = {
    video: {
      width: 100,    // width
      height: 100    // height
    },
    audio: false
  };

  video = createCapture(constraints);
  video.size(100, 100);
  video.hide();

  //Loading the UNet real-time human segmentation model
  segmenter = ml5.uNet('person', modelReady);
}
//Model call
function modelReady() {
  console.log('✅ Model loaded!');
  isModelReady = true;
}

function draw() {
  //background
  //background(bgImg);

  //perlin noise 4
//Dynamic fluctuation intensity: fluctuates up and down over time
let dynamicStrength = 80 + sin(frameCount * 0.05) * 40;
//Noise flow velocity (faster in the y-direction, like a waterfall)
let dynamicSpeed = 0.02 + abs(sin(frameCount * 0.01)) * 0.03;


//Call the twist function
drawWavyBackground(bgImg, dynamicStrength, dynamicSpeed);


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
  //Create a smaller temporary canvas
  let smallGraphics = createGraphics(width / pixelSize, height / pixelSize);
  smallGraphics.noSmooth();

  //Shrink the current image and draw it onto a smaller canvas.
  smallGraphics.image(get(), 0, 0, smallGraphics.width, smallGraphics.height);

  //Then enlarge it back to its original size to create a pixelated style.
  noSmooth();
  image(smallGraphics, 0, 0, width, height);
  smooth();
}
//Don't move!(Group code)
function gotResult(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  segmentation = result;
}
//Screenshoot
function saveSnapshot() {
  saveCanvas('myCanvas', 'png');
}
//"I forget ddl"words
function drawStatusText() {
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("I forgot ddl", width / 2, height*1 / 4);

}

//perlin noise 4

//Time offset
let yoff = 0; 

function drawWavyBackground(img, waveStrength = 20, noiseScale = 0.02) {
  let pg = createGraphics(width, height);
  img.loadPixels();

  for (let x = 0; x < width; x++) {
    
    //Perlin noise Generate the vertical offset for each column.
    let n = noise(x * noiseScale, yoff);
    
    //The fluctuation amplitude changes periodically over time, increasing the sense of rhythm.
    let dynamicWave = waveStrength + sin(frameCount * 0.05 + x * 0.1) * (waveStrength / 2);
    let yOffset = map(n, 0, 1, -dynamicWave, dynamicWave);

    //Get the pixels of this column
    let col = img.get(x, 0, 1, height);
    
    //Shift the entire column vertically.
    pg.image(col, x, yOffset);
  }

  //The time offset advances, creating a dynamic animation.
  yoff += 0.01;

  image(pg, 0, 0, width, height);
}