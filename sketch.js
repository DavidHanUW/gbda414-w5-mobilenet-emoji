let video;
let classifier;
let currentLabel = "Waiting for classification...";
let currentConfidence = 0;
let modelLoaded = false;

function setup() {
  createCanvas(960, 720);
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  classifier = ml5.imageClassifier("MobileNet", { flipped: true });
  modelLoaded = true;
  classifier.classifyStart(video, gotResults);
}

function gotResults(results) {
  if (!results || results.length === 0) return;
  currentLabel = results[0].label;
  currentConfidence = results[0].confidence;
}

function draw() {
  image(video, 0, 0, width, height);
  fill(0, 160);
  noStroke();
  rect(20, 20, 760, 200, 12);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(18);
  text("STEP 2: MOBILENET CLASSIFICATION", 40, 42);
  if (!modelLoaded) {
    textSize(24);
    text("loading MobileNet...", 40, 82);
    return;
  }
  textSize(18);
  text("MobileNet label:", 40, 82);
  textSize(28);
  text(currentLabel, 40, 115, 680, 45);

  textSize(18);
  text("Confidence: " + nf(currentConfidence * 100, 2, 1) + "%", 40, 175);
}
