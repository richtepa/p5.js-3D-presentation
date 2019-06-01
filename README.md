# p5.js-3D-presentation

## Setup

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css" type="text/css">
  
    <!-- STYLESHEET: -->
    <link rel="stylesheet" href="p5_js-3D-presentation.css" type="text/css">
  
    <title>Presentation</title>
</head>
<body>
    <div id="slides">
        <div id="slide0" class="slide hidden">
          
            <!-- SLIDE CONTENT: -->
            <div class="title">Title</div>
            <div class="text">Text</div>
            <div class="slideNum">1</div>
          
        </div>
      
        <!-- ADD MORE SLIDES -->
      
    </div>
    <div id="black" class="hidden"></div>
    <div id="white" class="hidden"></div>
  
    <!-- DATA FOR 3D-ANIMATION: -->
    <script src="slideData.js"></script>
  
    <script src="p5_js-3D-presentation.js"></script>
    <script src="p5.min.js"></script>
    <script src="p5.dom.min.js"></script>
</body>
</html>
```

## Creation

### Slides

```html

<div id="slide0" class="slide hidden">
    <!-- You can do whatever wou want to show in your slide here -->
</div>

```


### 3D-Data

```javascript
slideData = {
    "background": [240, 128, 128],
    "objects": [
        {
            "name": "table",
            "model": "3Dmodel/table/Table.obj",
            "material": [100, 50, 0],
            "scale": 0.5
        },
        {
            "name": "computer",
            "model": "3Dmodel/pc/PC.obj",
            "texture": "3Dmodel/pc/PC.png",
            "scale": 1
        }
    ],
    "slides": [{
            "duration": 0,
            "camera": {
                "ry": -40,
                "y": -100,
                "z": 150
            },
            "table": {
                "visible": false,
                "z": 40,
                "y": 90,
                "rx": 90,

            },
            "computer": {
                "visible": false,
                "x": 75,
                "y": 90,
                "z": 40,
                "ry": -90,
                "rz": 180
            }
        },
        {
            "duration": 2,
            "camera": {
                "ry": 40,
                "y": 100,
                "z": 350
            },
            "table": {
                "visible": true
            },
            "computer": {
                "visible": true
            }
        }
    ]
};
```

## Usage

Arrow left: last slide
Arrow right: next slide
w: white background
b: black background


## Example

[The example](https://richter.dev/p5-js-3D-presentation/) is built with [this index.html](https://github.com/richtepa/p5.js-3D-presentation/blob/master/index.html) and [this slideData](https://github.com/richtepa/p5.js-3D-presentation/blob/master/slideData.js).
