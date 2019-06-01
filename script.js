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
