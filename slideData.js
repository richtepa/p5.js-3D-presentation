//Camera rotation --> center

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
        },
        {
            "name": "mouse",
            "model": "3Dmodel/mouse/ComputerMouse.obj",
            "texture": "3Dmodel/mouse/ComputerMouse.png",
            "scale": 4
        },
        {
            "name": "monitor",
            "model": "3Dmodel/monitor/Monitor.obj",
            "texture": "3Dmodel/monitor/Monitor.png",
            "scale": 1
        },
        {
            "name": "keyboard",
            "model": "3Dmodel/keyboard/Keyboard.obj",
            "texture": "3Dmodel/keyboard/Keyboard.png",
            "scale": 1
        }
    ],
    "slides": [
        {
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
            },
            "mouse": {
                "visible": true
            },
            "monitor": {},
            "keyboard": {
                "visible": true
            }
        },
        {
            "duration": 2,
            "camera": {
                "y": -100,
            },
            "table": {
                "x": -500
            },
            "computer": {
                "x": -500
            },
            "mouse": {},
            "monitor": {},
            "keyboard": {}
        },

        {
            "duration": 2,
            "camera": {
                "x": 100,
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
            "monitor": {},
            "keyboard": {
                "z": 200
            }
        },
        {
            "duration": 2,
            "camera": {
                "ry": -40,
                "x": -100,
                "z": -50
            },
            "table": {},
            "computer": {},
            "mouse": {
                "visible": false
            },
            "monitor": {},
            "keyboard": {
                "visible": false
            }
        }
    ]
};
