(function( $ ) {
  $.fn.sliderise = function(options) {
		    
		// Sliderise defaults
    var defaults = {  
		  speed: 3500,  
		  auto: true,
		  left: 'middle',
		  right: 'middle'
	  };  
	  var options = $.extend(defaults, options);  
	  
    return this.each(function(){
	    
	    // Set up some variables for construction and position tracking
	    var slider = $(this);
	    var slideCount = 0;
	    var slideWidth = [];
	    var slideHeight = [];
	    var slid = 0;
	    var slides = [];
	    var controls = '<img class="left control" src="img/arrow_left-passive.svg"/><img class="right control" src="img/arrow_right-passive.svg"/>';
	    var leftArrPos;
	    var rightArrPos;
	    
	    
	    function getMaxOfArray(numArray) {
		    return Math.max.apply(null, numArray);
			}
	    
	    // Move the slide to the right through CSS.
	    function slideThis(slideS){
        slider.children().not('.control').animate({left: slideS}, 500);
	    }
	    
	    function attachControls(){
		    setTimeout(function(){slider.children('.left').bind('click', goLeft);}, 500);
        setTimeout(function(){slider.children('.right').bind('click', goRight);}, 500);
        slider.find('.left').hover(function(){$(this).attr('src', 'img/arrow_left-active.svg')}, function(){$(this).attr('src', 'img/arrow_left-passive.svg')});
        slider.find('.right').hover(function(){$(this).attr('src', 'img/arrow_right-active.svg')}, function(){$(this).attr('src', 'img/arrow_right-passive.svg')});
	    }
	    
	    function detachControls(){
		    slider.children('.control').unbind();
	    }
	    
	    // Append the new slide, move all slides left, and then delete the hidden slide.
	    function eatSlideDestroy(){
		    detachControls();
        slider.append(slides[slid]);
        slider.children().not('.control').eq(1).css({left: slideWidth});
        slideThis('-=' + slideWidth);
        setTimeout(function(){slider.children().not('.control').eq(0).remove();}, 500);
        attachControls();
	    }
	    
	    // Prepend the new slide, move all slides right, then delete the hidden slide.
	    function feedLeft(){
        detachControls();
        slider.prepend(slides[slid]);
        slider.children().not('.control').eq(0).css({left: - slideWidth});
        slideThis('+=' + slideWidth);
        setTimeout(function(){slider.children().not('.control').eq(1).remove();}, 500); 
        attachControls(); 
	    }
	    
	    function goLeft(){
        clearInterval(roundabout);
        if (slid > 0) {
            slid--;
            feedLeft();    
        }
        else {
            slid = slideCount - 1;
            feedLeft();
        }
	    }
	    
	    function goRight(){
        clearInterval(roundabout);
        carousel();
	    }
	    
	    // While the slides are loading, hide the slider
	    slider.hide();
	    
	    $(window).load(function() {
	    
	      // Apply CSS styling that makes the slider work
	      slider.show();
	      slider.css({'white-space': 'nowrap', 'position': 'relative', 'overflow': 'hidden'}); 
	      slider.children().css({'display': 'inline-block', 'position': 'absolute', 'display': 'block'});
        
        // Store all the slides in an array and remove them
        slider.children().each(function(){
          slides.push($(this));
          slideWidth.push($(this).width());
          slideHeight.push($(this).height());
          $(this).remove();
          slideCount++;
        })
        
        // Set sizes automatically based on DOM content
        slideWidth = getMaxOfArray(slideWidth);
        slideHeight= getMaxOfArray(slideHeight);
        slider.css({width: slideWidth, height: slideHeight});
        
        // Get the arrow positioning from options
		    switch(options.left) {
			    case 'middle':
				    leftArrPos = {'top': ((slideHeight/2) - 10) + 'px', 'left': '0px'};
				    console.log(leftArrPos);
				    break;
				  case 'top':
					  leftArrPos = {'top': '0px', 'left': '0px'};
					  break;
				  case 'bottom':
					  leftArrPos = {'bottom': '0px', 'left': '0px'};
					  break;
					default:
						leftArrPos = options.left;
						break;
		    }
        
        switch(options.right) {
			    case 'middle':
				    rightArrPos = {'top': ((slideHeight/2) - 10) + 'px', 'right': '0px'};
				    console.log(rightArrPos);
				    break;
			    case 'top':
					  rightArrPos = {'top': '0px', 'right': '0px'};
					  break;
				  case 'bottom':
					  rightArrPos = {'bottom': '0px', 'right': '0px'};
					  break;
					default: 
						rightArrPos = options.right;
						break;
		    }
        
        // Put the first slide in
        slider.append(slides[0]);
        
        // Insert the controls
		    slider.prepend(controls);
		    slider.children('.left').css(leftArrPos);
		    slider.children('.right').css(rightArrPos);
        slider.children('.control').css({'position': 'absolute', 'cursor': 'hand', 'cursor': 'pointer', 'z-index': '1'});
        attachControls();
	    });
	    
	    // Loop through the slides array to make a carousel effect.
	    function carousel() {
        slid++
        if (slid < slideCount) {
          eatSlideDestroy();
        }
        else {
          slid = 0;
          eatSlideDestroy();
        }
	    }
	    
	    // Set the carousel effect to fire every x seconds.
	    if (options.auto == true) {
		    var roundabout = setInterval(function() {
	        carousel();
		    }, options.speed);
	    }
		});
  };
})( jQuery );