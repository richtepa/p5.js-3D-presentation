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
