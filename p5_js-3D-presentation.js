fps = 60;
positionVariables = ["x", "y", "z", "rx", "ry", "rz"];
models = new Object();
textures = new Object();
actualSlide = 0;
mouseX = undefined;
content = document.body;
width = content.clientWidth;

cam = new Cam();
objects = new Array();
for (model of slideData.objects) {
    data = Object.assign(model, slideData.slides[0][model.name]);
    objects.push(new Model(data));
}

window.onload = function () {
    width = content.clientWidth;

    content.addEventListener("touchstart", function (e) {
        mouseX = e.changedTouches[0].pageX;
    });
    content.addEventListener("touchend", function (e) {
        dif = e.changedTouches[0].pageX - mouseX;
        if (dif > width / 3) {
            next();
        }
        if (dif < -width / 3) {
            before();
        }
        mouseX = undefined;
    });

    createAllElements();
    changeSlide(0, false);
}



function Cam() {
    for (p of positionVariables) {
        this[p] = 0;
    }
    this.reset = function () {
        this.animate = false;
        this.visible = true;
        this.aim = new Object();
        this.old = new Object();
        for (p of positionVariables) {
            this.aim[p] = 0;
            this.old[p] = this[p];
        }
        this.duration = 0;
        this.progress = 0;
    }

    this.reset();
}


function Model(data) {
    for (p of positionVariables) {
        this[p] = 0;
    }

    this.reset = function () {
        this.animate = false;
        this.visible = true;
        this.aim = new Object();
        this.old = new Object();
        for (p of positionVariables) {
            this.aim[p] = 0;
            this.old[p] = this[p];
        }
        this.duration = 0;
        this.progress = 0;
    }

    this.name = data.name
    this.model = data.model;
    this.texture = data.texture;
    this.material = data.material;
    this.scale = data.scale || 1;
    this.reset();
}



function createAllElements() {
    structure = document.getElementById("structure");
    if (structure != undefined) {
        ul = document.createElement("ul");
        structure.appendChild(ul);
        for (i = 0; i < slideData.slides.length; i++) {
            slide = slideData.slides[i];
            if (slide.title != undefined) {
                e = document.createElement("li");
                e.id = "structure" + i;
                e.classList.add("structure");
                e.innerHTML = slide.title;
                e.addEventListener("click", function () {
                    actualSlide = this.id.split("structure")[1];
                    changeSlide(actualSlide, false);
                });
                ul.appendChild(e);
            }
        }
    }

    white = document.createElement("div");
    white.id = "white";
    white.classList.add("hidden");
    document.body.appendChild(white);

    black = document.createElement("div");
    black.id = "black";
    black.classList.add("hidden");
    document.body.appendChild(black);

    let presentation = new p5(pres, "pres3D");
}

const pres = function (sketch) {

    sketch.preload = function () {
        for (obj of objects) {
            models[obj.name] = sketch.loadModel(obj.model);
            if (obj.texture != undefined) {
                textures[obj.name] = sketch.loadImage(obj.texture);
            }
        }
    }

    sketch.setup = function () {
        sketch.createCanvas(document.getElementById("pres3D").clientWidth, this.height = document.getElementById("pres3D").clientHeight, sketch.WEBGL);
        sketch.angleMode(sketch.DEGREES);
    }

    sketch.windowResized = function () {
        width = content.clientWidth;
        sketch.resizeCanvas(document.getElementById("pres3D").clientWidth, document.getElementById("pres3D").clientHeight);
    }

    sketch.draw = function () {
        sketch.noStroke();
        sketch.background(slideData.background[0], slideData.background[1], slideData.background[2]);

        try {
            // user implemented function
            beforeDraw(sketch);
        } catch {}

        //CAMERA
        if (cam.animate) {
            if (cam.progress < 1) {
                cam.progress += 1 / (cam.duration * fps);
                if (cam.progress > 1) {
                    cam.progress = 1;
                }
            } else {
                if (slideData.slides[actualSlide].noClick) {
                    next();
                }
            }
            for (p of positionVariables) {
                if (cam[p] != cam.aim[p]) {
                    cam[p] = (cam.progress * cam.aim[p]) + ((1 - cam.progress) * cam.old[p]);
                }
            }
        }
        sketch.camera(
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
                        obj[p] = (obj.progress * obj.aim[p]) + ((1 - obj.progress) * obj.old[p]);
                    }
                }
            }


            if (obj.visible) {
                sketch.push();
                sketch.translate(obj.x, obj.y, obj.z);
                sketch.rotateX(obj.rx);
                sketch.rotateY(obj.ry);
                sketch.rotateZ(obj.rz);
                sketch.scale(obj.scale);
                if (textures[obj.name] != undefined) {
                    sketch.texture(textures[obj.name]);
                } else {
                    sketch.fill(obj.material[0], obj.material[1], obj.material[2]);
                }
                sketch.model(models[obj.name]);
                sketch.pop();
            }

        }

        try {
            // user implemented function
            afterDraw(sketch);
        } catch {}
    }
}


document.addEventListener("keydown", function (e) {
    //console.log(e.keyCode);
    if (e.keyCode == "37" || e.keyCode == "38") {
        before();
    }
    if (e.keyCode == "39" || e.keyCode == "40") {
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

function before() {
    actualSlide--;
    if (actualSlide < 0) {
        actualSlide = 0;
    }
    while (slideData.slides[actualSlide].noClick) {
        actualSlide--;
        if (actualSlide < 0) {
            actualSlide = 0;
            break;
        }
    }
    changeSlide(actualSlide, false);
}

function next() {
    actualSlide++;
    if (actualSlide > slideData.slides.length - 1) {
        actualSlide = slideData.slides.length - 1;
    }
    changeSlide(actualSlide, true);
}

function changeSlide(n, animate) {
    try {
        // user implemented function
        slideActivated(n);
    } catch {}
    updateStructure(n);
    updateSlide(n);
    update3D(n, animate);
}



function updateStructure(n) {
    while(slideData.slides[n].noClick){
        n++;
    }
    structures = document.getElementsByClassName("structure");
    for (structure of structures) {
        structure.classList.remove("active");
    }
    try {
        document.getElementById("structure" + n).classList.add("active");
    } catch {}
}

function updateSlide(n) {
    slides = document.getElementsByClassName("slide");
    for (slide of slides) {
        if (slide.id.split("slide")[1] <= n) {
            slide.classList.remove("hidden");
        } else {
            slide.classList.add("hidden");
        }
    }
}

function update3D(n, animate) {
    //CAMERA
    cam.reset();
    for (s = 0; s <= n; s++) {
        if (slideData.slides[s]["camera"] != undefined) {
            for (p of positionVariables) {
                val = slideData.slides[s]["camera"][p];
                if (val != undefined) {
                    cam.aim[p] += val;
                }
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
            if (slideData.slides[s][obj.name] != undefined) {
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
