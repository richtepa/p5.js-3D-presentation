# p5.js-3D-presentation

## Contribution

Feel free to contribute! (Especially if you want to correct my bad English ;) )

## Usecases

If you want to show a slideshow with multiple 3D-Models, which are positioned relative to each other in space, you can use this library.

If you already know [p5.js](https://github.com/processing/p5.js), you can draw additional things.

## Implementation

### html
* To get started, add the [p5 library](https://github.com/processing/p5.js): `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.min.js"></script>` and the [3D-presentation script](https://github.com/richtepa/p5.js-3D-presentation/blob/master/p5_js-3D-presentation.js) `<script src="p5_js-3D-presentation.js"></script>`
* In the header of your html put the [3D-presentation stylesheet]() above your own styles: `<link rel="stylesheet" href="p5_js-3D-presentation.css">`
* If you want to show a structure of your slides, add a `#structure` element.
* For your slides (text) create a `#slides`element with `#slide?.slide.hidden`elements inside. Use numbers starting from 0 istead of the ?. Inside these elements you can add amything you want. If you want to show the same information like the last one use the add `.pseudo`.
* The `#pres3D`element defined the spot for your 3D-view.

### js/json (data)

All the information about the 3D scene is saved in the js-object slideData:
* `.background`: array with r,g,b-values of the background-color. Leave it undefined to use no background.
* `.objects`: array of all used objects in the scene
  * `.name`: (required) name of the object, used in slides as identifier
  * `groups`: array of the groups it is used
  * `.model`: (required) path of the file of the 3D-model
  * `.texture` **or** `.material`: (required) path of the file of the texture or array with r,g,b-values of the material color
  * `scale`: Scale of the model (default: 1)
* `.slides`: array of the slides corresponding to the text-slides
  * `.duration`: animationtime in seconds (default: 0)
  * `.title`: use if a title should appear in the structure
  * `.autoplay`: when finished the animation, doing the next slide, if true (default: false)
  * `.camera`and `.[object]` and `.[object]`: use the camera and the name of an object or group as identifier for their propertys. All propertys are added through the slides and groups.
    * `visible`: model is visible if true (default: true)
    * `.x`, `.y` and `.z`: x, y and z position of the object (default: 0)
    * `.rx`, `.ry` and `.rz`: x, y and z rotation of the object (in degrees) (center point at `.camera`) (default: 0)
    

### js user functions

You can add your own js-code. There are three functions for specific tasks:

```js
function slideActivated(slideNumber) {
    // will be executed when slide gets changed
}

function beforeDraw(sketch) {
    // will be excecuted before p5-content gets drawn
    // use sketch. for p5-functions
}

function afterDraw(sketch) {
    // will be excecuted after p5-content get drawn
    // use sketch. for p5-functions
}
```

You can use following variables:
* `height`: body height
* `width`: body width

## Example

Check out [this demo](https://richter.dev/p5-js-3D-presentation/example) made with the files from [the example folder](https://github.com/richtepa/p5.js-3D-presentation/blob/master/example).

## Usage while presenting

By default, the cursor is hidden when inside the `#pres3D` element.

* next slide: use keys or swipe on touchscreen <kbd>&#8594;</kbd> / <kbd>&#8595;</kbd>
* last slide: use keys or swipe on touchscreen <kbd>&#8592;</kbd> / <kbd>&#8593;</kbd>
* white screen: <kbd>w</kbd>
* black screen: <kbd>b</kbd>
* enter fullscreen: <kbd>f</kbd>
* exit fullscreen: <kbd>esc</kbd>

