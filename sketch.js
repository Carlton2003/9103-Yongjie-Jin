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
  saveBtn.position(10, 10);//位置
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
  //背景图片
  //background(bgImg);

  //perlin noise 4
  // 动态波动强度：随时间上下律动
let dynamicStrength = 80 + sin(frameCount * 0.05) * 40;
// 噪声流动速度（y方向更快一点，像瀑布）
let dynamicSpeed = 0.02 + abs(sin(frameCount * 0.01)) * 0.03;


// 调用扭曲函数
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
  // 创建一个更小的临时画布
  let smallGraphics = createGraphics(width / pixelSize, height / pixelSize);
  smallGraphics.noSmooth();

  // 将当前画面缩小绘制到小画布中
  smallGraphics.image(get(), 0, 0, smallGraphics.width, smallGraphics.height);

  // 再把它放大回原尺寸形成像素风
  noSmooth();
  image(smallGraphics, 0, 0, width, height);
  smooth();
}
//不要改动这一块
function gotResult(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  segmentation = result;
}
//截屏功能
function saveSnapshot() {
  saveCanvas('myCanvas', 'png');
}
//I forget ddl 字体样式
function drawStatusText() {
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("I forgot ddl", width / 2, height*1 / 4);

}

//perlin noise 4
let yoff = 0; // 时间偏移量

function drawWavyBackground(img, waveStrength = 20, noiseScale = 0.02) {
  let pg = createGraphics(width, height);
  img.loadPixels();

  for (let x = 0; x < width; x++) {
    // Perlin noise 生成每一列的竖直偏移量
    let n = noise(x * noiseScale, yoff);
    // 波动幅度随时间周期性变化，增加节奏感
    let dynamicWave = waveStrength + sin(frameCount * 0.05 + x * 0.1) * (waveStrength / 2);
    let yOffset = map(n, 0, 1, -dynamicWave, dynamicWave);

    // 获取该列像素
    let col = img.get(x, 0, 1, height);
    // 将整列在竖直方向偏移
    pg.image(col, x, yOffset);
  }

  // 时间偏移量推进，形成动态动画
  yoff += 0.01;

  image(pg, 0, 0, width, height);
}