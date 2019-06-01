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
