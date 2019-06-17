// camera rotation --> centerpoint
// all values add up trough the process

slideData = {

    // define your background and objects
    "background": [240, 128, 128],
    
    "objects": [{
            "name": "table",
            "model": "3Dmodel/table/Table.obj",

            // you can use rgb-colors as material
            "material": [100, 50, 0],

            "scale": 0.5
                },
        {
            "name": "computer",
            "model": "3Dmodel/pc/PC.obj",
            "texture": "3Dmodel/pc/PC.png"
                },
        {
            "name": "mouse",
            "model": "3Dmodel/mouse/ComputerMouse.obj",

            // or images as textures
            "texture": "3Dmodel/mouse/ComputerMouse.png",

            "scale": 4
                },
        {
            "name": "monitor",
            "model": "3Dmodel/monitor/Monitor.obj",
            "texture": "3Dmodel/monitor/Monitor.png"
                },
        {
            "name": "keyboard",
            "model": "3Dmodel/keyboard/Keyboard.obj",
            "texture": "3Dmodel/keyboard/Keyboard.png"
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
            },
            "mouse": {
                "visible": false,
                "x": 60,
                "y": 1,
                "z": 60,
                "ry": 180,
                "rz": 180
            },
            "monitor": {
                "rz": 180,
                "ry": -90
            },
            "keyboard": {
                "visible": false,
                "z": 50,
                "rz": 180
            }
                },
        {

            // titles are shown in the structure
            "title": "Fits on every desk",

            "duration": 0.5,
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
            },
            "mouse": {
                "visible": true
            },
            "keyboard": {
                "visible": true
            }
                },
        {
            "title": "Specs",
            "duration": 0.5,
            "camera": {
                "y": -100,
            },
            "table": {
                "x": 500
            },
            "computer": {
                "x": 500
            }
                },

        {
            "title": "Screen specs",
            "duration": 0.5,
            "camera": {
                "x": -100,
                "z": -300
            },
            "table": {
                "visible": false
            },
            "computer": {
                "visible": false
            },
            "mouse": {
                "z": 200
            },
            "keyboard": {
                "z": 200
            },
                },
        {

            // with autoplay the next slide gets shown after duration
            "autoplay": true,

            "duration": 0.5,
            "camera": {
                "ry": -40,
                "x": 100,
                "z": -50
            },
            "mouse": {
                "visible": false
            },
            "keyboard": {
                "visible": false
            }
                },
        {
            "title": "Price",
            "duration": 0.5,
            "camera": {
                "ry": 40,
                "x": 100,
                "z": 50
            }
                }
            ]
};
