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
				clickEnabled: true // whether or not clicking the thumbnail interacts with the scrollable region
			}, opts);
		
		var img = $('#' + settings.image),
			container = $(img.parent()),
			imgWidth = img.width(),
			imgHeight = img.height();
		    thumbnail = new Image(),
		    selectUI = $('<div></div>'),
		    highlightActiveRegion = function() {
				var thumbOffset = $(thumbnail).offset(),
				    scrollLeftOffset = container.scrollLeft() / imgWidth * settings.width,
					scrollTopOffset = container.scrollTop() / imgHeight * settings.height
				selectUI.offset({
					top: thumbOffset.top + scrollTopOffset,
					left: thumbOffset.left + scrollLeftOffset
				});
			};
		thumbnail.onload = function() {
			var $thumbnail = $(this);
			$this.css('position', 'relative');
			$thumbnail.css({
				width: settings.width,
				height: settings.height
			});
			
			selectUI.css({
				width: container.width() / imgWidth * $thumbnail.width(),
				height: container.height() / imgHeight * $thumbnail.height(),
				position: 'absolute',
				border: '1px solid ' + settings.color
			});
			
			highlightActiveRegion();
		};
		thumbnail.src = img.prop('src');
		$this.append(thumbnail);
		$this.append(selectUI);
		
		container.scroll(function(e) {
			highlightActiveRegion();
		});
		
		if (settings.clickEnabled) {
			$(thumbnail).click(function(e) {
				var offset = $(thumbnail).offset(),
				    x = e.pageX - offset.left,
				    y = e.pageY - offset.top;
					
				container.scrollLeft(x * settings.width/2 * container.width() / imgWidth);
				container.scrollTop(y * settings.height/2 * container.height() / imgHeight);
			});
		}
		return this;
	}
}(jQuery));