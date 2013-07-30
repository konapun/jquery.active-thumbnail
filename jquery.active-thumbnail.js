/*
 * A responsive thumbnail that updates based on a scrollable image's position. Interacting with the thumbnail
 * also (optionally) scrolls the image.
 *
 * author: Bremen Braun (konapun), 2013 for FlyExpress (http://www.flyexpress.net/)
 */
;(function($) {
	$.fn.activeThumbnail = function(opts) {
		var $this = $(this),
		    settings = $.extend({
				image: $this.attr('data-image'),
				width: 100,
				height: 100,
				color: 'red',
				container: '', // default will be the parent of the image element
				clickEnabled: true // whether or not clicking the thumbnail interacts with the scrollable region
		    }, opts);
		
		var img = $('#' + settings.image),
		    container = settings.container ? $('#' + settings.container) : $(img.parent()),
		    thumbnail = new Image(),
		    selectUI = $('<div></div>'),
		    highlightActiveRegion = function() {
				var thumbOffset = $(thumbnail).offset(),
				    scrollLeftOffset = container.scrollLeft() / img.width() * settings.width,
				    scrollTopOffset = container.scrollTop() / img.height() * settings.height
				selectUI.offset({
					top: thumbOffset.top + scrollTopOffset,
					left: thumbOffset.left + scrollLeftOffset
				});
			};
		
		/* Called via plugin caller: recalculate size and position based on container and image sizes;
		 * only needs to be called when the image or container changes sizes
		 */
		selectUI.update = function() {
			var $thumbnail = $(thumbnail);
			selectUI.css({
				width: container.width() / img.width() * $thumbnail.width(),
				height: container.height() / img.height() * $thumbnail.height()
			});
		};
		
		selectUI.getThumbnail = function() {
			return thumbnail;
		};
		
		thumbnail.onload = function() {
			var $thumbnail = $(this);
			$this.css('position', 'relative');
			$thumbnail.css({
				width: settings.width,
				height: settings.height
			});
			
			selectUI.css({
				position: 'absolute',
				border: '1px solid ' + settings.color
			}).update();
			
			$this.append(selectUI);
			$this.append(thumbnail);
			highlightActiveRegion();
		};
		
		var _img = img.get(0),
		    loadComplete = function() {
				thumbnail.src = img.prop('src');
		    };
		_img.onload = loadComplete;
		if (_img.complete) {
			loadComplete();
		}
		
		container.scroll(function(e) {
			highlightActiveRegion();
		});
		
		if (settings.clickEnabled) {
			$(thumbnail).click(function(e) {
				var offset = $(thumbnail).offset(),
				    x = e.pageX - offset.left,
				    y = e.pageY - offset.top;
					
				container.scrollLeft(x * settings.width/2 * container.width() / img.width());
				container.scrollTop(y * settings.height/2 * container.height() / img.height());
			});
		}
		
		return selectUI;
	}
}(jQuery));