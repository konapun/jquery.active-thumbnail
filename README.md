# active-thumbnail
Create a thumbnail for a scrolled image that displays the current global location and updates on scroll

## Usage
```html
	<span id="thumbnail" class="thumbnail" data-image="plot"></span>
	<div class="center overflow">
		<img id="plot" src="img/zen_sna_7.png"></img>
	</div>
	
	<script type="text/javascript">
		$(function() {
			$('#thumbnail').activeThumbnail();
		});
	</script>
```

The image source to use for the thumbnail is specified either by setting the `data-image` property for the thumbnail,
or in the init options

## Options
  * **image**: If the `data-image` HTML property is not specified, this is the id of the image to create a thumbnail view of
  * **width**: Width of the thumbnail (default: 100px)
  * **height**: Height of the thumbnail (default: 100px)
  * **color**: Border color for the current viewable region in the thumbnail (default: red)
  * **clickEnabled**: Allow scrolling of the main image through interactions with the thumbnail (default: true)
  * **container**: The id of the container element. If not provided, the parent element of the image is used
  
## Returns
The element representing the selected portion of the thumbnail. This has a method called `upate` which recalculates its size in relation to the image and container, so it can be called when the image zooms
