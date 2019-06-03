/*


RÜCKWÄRTS BLÄTTERN FUNTIONIERT NICHT!


*/



fps = 60;
positionVariables = ["x", "y", "z", "rx", "ry", "rz"];
models = new Object();
textures = new Object();
actualSlide = 0;

cam = new Cam();



objects = new Array();
for (model of slideData.objects) {
    data = Object.assign(model, slideData.slides[0][model.name]);
    objects.push(new Model(data));
}

showSlide(0, false);

function Cam() {
    this.reset = function () {
        this.animate = false;
        this.visible = true;
        this.aim = new Object();
        for (p of positionVariables) {
            this.aim[p] = 0;
        }
        this.duration = 0;
        this.progress = 0;
    }

    this.reset();
    for (p of positionVariables) {
        this[p] = 0;
    }
}


function Model(data) {
    this.reset = function () {
        this.animate = false;
        this.visible = true;
        this.aim = new Object();
        for (p of positionVariables) {
            this.aim[p] = 0;
        }
        this.duration = 0;
        this.progress = 0;
    }



    this.name = data.name
    this.model = data.model;
    this.texture = data.texture;
    this.material = data.material;
    this.scale = data.scale;
    this.reset();
    for (p of positionVariables) {
        this[p] = 0;
    }
}



function preload() {
    for (obj of objects) {
        models[obj.name] = loadModel(obj.model);
        if (obj.texture != undefined) {
            textures[obj.name] = loadImage(obj.texture);
        }
    }
}

function setup() {
    createCanvas(windowWidth / 100 * 33, windowHeight, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    noStroke();
    //background(240, 128, 128);
    background(slideData.background[0], slideData.background[1], slideData.background[2]);

    
    //CAMERA
    if (cam.animate) {
        if (cam.progress < 1) {
            cam.progress += 1 / (cam.duration * fps);
            if (cam.progress > 1) {
                cam.progress = 1;
            }
        }
        for (p of positionVariables) {
            if (cam[p] != cam.aim[p]) {
                cam[p] = (cam.progress * cam.aim[p]) + ((1 - cam.progress) * cam[p]);
            }
        }
    }


    camera(
        cam.x, cam.y, cam.z,
        cam.rx, cam.ry, cam.rz,
        0, 1, 0
    );


    //OBJECTS
    for (obj of objects) {
        if (obj.animate) {
            if (obj.progress < 1) {
                obj.progress += 1 / (obj.duration * fps);
                if (obj.progress > 1) {
                    obj.progress = 1;
                }
            }
            for (p of positionVariables) {
                if (obj[p] != obj.aim[p]) {
                    obj[p] = (obj.progress * obj.aim[p]) + ((1 - obj.progress) * obj[p]);
                }
            }
        }

        
        if (obj.visible) {
            push();
            translate(obj.x, obj.y, obj.z);
            rotateX(obj.rx);
            rotateY(obj.ry);
            rotateZ(obj.rz);
            scale(obj.scale);
            if (textures[obj.name] != undefined) {
                texture(textures[obj.name]);
            } else {
                fill(obj.material[0], obj.material[1], obj.material[2]);
            }
            model(models[obj.name]);
            pop();
        }

    }
}

document.addEventListener("keydown", function (e) {
    //console.log(e.keyCode);
    if (e.keyCode == "37") {
        before();
    }
    if (e.keyCode == "39") {
        next();
    }
    if (e.keyCode == "66") {
        document.getElementById("black").classList.toggle("hidden");
    }
    if (e.keyCode == "87") {
        document.getElementById("white").classList.toggle("hidden");
    }
    if (e.keyCode == "70") {
        document.body.requestFullscreen();
    }
});

function windowResized() {
    resizeCanvas(windowWidth * 33 / 100, windowHeight);
}

function before() {
    actualSlide--;
    if (actualSlide < 0) {
        actualSlide = 0;
    }
    showSlide(actualSlide, false);
}

function next() {
    actualSlide++;
    if (actualSlide > slideData.slides.length - 1) {
        actualSlide = slideData.slides.length - 1;
    }
    showSlide(actualSlide, true);
}


function showSlide(n, animate) {
    slideActivated(n);

    //TEXT
    slides = document.getElementsByClassName("slide");
    for (slide of slides) {
        slide.classList.add("hidden");
    }
    document.getElementById("slide" + n).classList.remove("hidden");


    //CAMERA
    cam.reset();
    for (s = 0; s <= n; s++) {
        for (p of positionVariables) {
            val = slideData.slides[s]["camera"][p];
            if (val != undefined) {
                cam.aim[p] += val;
            }
        }
    }
    if (animate) {
        cam.duration = slideData.slides[n].duration;
    } else {
        cam.duration = 0;
    }
    cam.progress = 0;
    cam.animate = true;


    //OBJECTS
    for (obj of objects) {
        obj.reset();
        for (s = 0; s <= n; s++) {
            if (slideData.slides[s][obj.name].visible != undefined) {
                obj.visible = slideData.slides[s][obj.name].visible;
            }
            for (p of positionVariables) {
                val = slideData.slides[s][obj.name][p];
                if (val != undefined) {
                    obj.aim[p] += val;
                }
            }
        }
        if (animate) {
            obj.duration = slideData.slides[n].duration;
        } else {
            obj.duration = 0;
        }
        obj.progress = 0;
        obj.animate = true;
    }
}
