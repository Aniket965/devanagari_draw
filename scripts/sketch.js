let painting = false 

function setup() {
    var div = document.getElementById('sketchdiv')
    var canvas = createCanvas(320, 320)
    canvas.parent(div)
    background(0)
}

function draw() {
    strokeWeight(8);
    stroke(255);
    
    if (mouseIsPressed && painting) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

}

function mousePressed() {
    painting = true;

  }
  // Stop
  function mouseReleased() {
    painting = false;
  }
  
document.addEventListener('DOMContentLoaded', _ => {
    let predict = document.getElementById('predict')
    predict.addEventListener('click', _ => {
        let input_pixels = [];
        let img = get()
        img.resize(32, 32)
        img.loadPixels()
        for (let i = 0; i < 1024; i++) {
            let grayscale = img.pixels[i * 4];
            input_pixels[i] = grayscale;
        }
        console.log(input_pixels)
    })

}, false);
