let painting = false

function setup() {
    var div = document.getElementById('sketchdiv')
    var canvas = createCanvas(320, 320)
    canvas.parent(div)
    background(0)
}

function draw() {
    strokeWeight(20);
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

document.addEventListener('DOMContentLoaded', async _ => {
    let predict = document.getElementById('predict')
    predict.addEventListener('click', _ => {
        let input_pixels = [];
        let img = get()
        img.resize(32, 32)
        img.loadPixels()
        for (let i = 0; i < 1024; i++) {
            let grayscale = img.pixels[i * 4];
            input_pixels[i] = map(grayscale, 0, 255, -0.5, 0.5);
        }
        let x = tf.tensor1d(input_pixels);
        x = x.reshape([32, 32])
        const t4d = tf.tensor4d(Array.from(x.dataSync()),[1,32,32,1])
        console.log(t4d);
        const prediction = model.predict(t4d);
        prediction.print()
        tf.argMax(prediction,axis=1).print()
    })
    const model = await tf.loadModel('http://127.0.0.1:5500/jsmodel/model.json');
}, false);
