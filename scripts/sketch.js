let painting = false
let dict_mapper = {
    0: 'yna',
    1: 'taamatar',
    2: 'thaa',
    3: 'daa',
    4: 'dhaa',
    5: 'adna',
    6: 'tabala',
    7: 'tha',
    8: 'da',
    9: 'dha',
    10: 'ka',
    11: 'na',
    12: 'pa',
    13: 'pha',
    14: 'ba',
    15: 'bha',
    16: 'ma',
    17: 'yaw',
    18: 'ra',
    19: 'la',
    20: 'waw',
    21: 'kha',
    22: 'motosaw',
    23: 'petchiryakha',
    24: 'patalosaw',
    25: 'ha',
    26: 'chhya',
    27: 'tra',
    28: 'gya',
    29: 'ga',
    30: 'gha',
    31: 'kna',
    32: 'cha',
    33: 'chha',
    34: 'ja',
    35: 'jha',
    36: '0',
    37: '1',
    38: '2',
    39: '3',
    40: '4',
    41: '5',
    42: '6',
    43: '7',
    44: '8',
    45: '9'
}
function setup() {
    var div = document.getElementById('sketchdiv')
    var canvas = createCanvas(320, 320)
    canvas.parent(div)
    background(0)
}

function draw() {
    strokeWeight(30);
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
    let clear = document.getElementById('clear');
    clear.addEventListener('click', _ => {
        let text = document.getElementById('text');
        text.innerHTML = "Devanagari Draw"
        background(0)
    })
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
        const t4d = tf.tensor4d(Array.from(x.dataSync()), [1, 32, 32, 1])

        const prediction = model.predict(t4d);
        let pre = tf.argMax(prediction, axis = 1)
        let predictions = pre.dataSync();
        console.log(predictions[0])
        let word = dict_mapper[predictions[0]]
        let text = document.getElementById('text');
        text.innerHTML = word
    })
    const model = await tf.loadModel('http://aniket965.ml/devanagari_draw/jsmodel/model.json');
}, false);
