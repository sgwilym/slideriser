# Slideriser

A jQuery plugin that turns any container into a slider, with all its first children as slides. Pronounced 𐑕𐑤𐑲𐑛𐑻𐑲𐑟𐑻.

## A very informal and simple guide

### Write your HTML

Sliderise works on elements with any number of children inside them.

```html
<div id="my-slider">
	<img src="slide1.png"/>
	<img src="slide2.png"/>
	<img src="slide3.png"/>
</div>
```

Those child elements can also have any structure inside of them.

```html
<div id="my-slider">
	<div>
		<img src="slide1.png"/>
		<p>This is my first slide</p>
	</div>
	<div>
		<img src="slide2.png"/>
		<p>This is my second slide</p>
		<p>This one's the best!</p>
	</div>
	<div>
		<img src="slide3.png"/>
		<p>This is my third slide</p>
	</div>
</div>
```

How the slides are styled, ordered or laid out is completely up to you. You can even have different elements as the first children of the containing div.

The slider adjusts its own size automatically based on the size of your largest slide.

Still, it's a good idea to avoid altering style attributes that are intrinsic to the operation of the slider, such as 'display' and 'position'. Sliderise may not work as expected if you change these attributes.

### Using Sliderise

Link to sliderise.jquery.js, and then you can use it like so:

```javascript
$(document).ready(function(){
	$('#my-slider').sliderise();
});
```

Sliderise can be used for multiple sliders on a single page, with different IDs, different classes or all belonging to the same class.

### Options

There are also four options: speed, which adjusts the interval between slides moving; auto, which sets whether the slider will slide automatically; left, which adjusts the position of the left arrow; and right, which adjusts the position of the right arrow.

If you wanted to have a slider that changed slides every 10 seconds, you'd write

```javascript 
$('#my-slider').sliderise({speed: 10000});
```
    
where 10000 is the number of milliseconds the carousel effect waits until sliding again. The default is 3500 ms.

If you wanted to have a slider that does not slide automatically, you'd write

```javascript
$('#my-slider').sliderise({auto: false});
```
    
The default for this option is true.

By default, arrows will appear on the left and right sides of the slider, vertically centered. But it's easy to place them at the top, at the bottom, or in an arbitrary position:

```javascript
$('#my-slider').sliderise(left: lPosition, right: rPosition);
```
    
where lPosition and rPosition can be 'top', 'middle', 'bottom', or css enclosed in curly brackets, e.g {'left': '100px', 'top': '10px'}.

