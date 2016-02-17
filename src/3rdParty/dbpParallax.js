
export class dbpParallax {
    constructor() {
    };
    
    init(){
        
            var $window = $(window);
			var windowHeight = $window.height();
            

			$window.resize(function () {
				windowHeight = $window.height();
			});

			$.fn.parallax = function (xpos, topOffset, speedFactor, outerHeight) {
				var $this = $(this);
				var getHeight;
				var firstTop;
				var paddingTop = 0;
                
                var self = this;
			
				//get the starting position of each element to have parallax applied to it		
				$this.each(function () {
					firstTop = $this.offset().top;
				});

				if (outerHeight) {
					getHeight = function (jqo) {
						return jqo.outerHeight(true);
					};
				} else {
					getHeight = function (jqo) {
						return jqo.height();
					};
				}
				
				// setup defaults if arguments aren't specified
				if (arguments.length < 1 || xpos === null) xpos = "50%";
				if (arguments.length < 2 || topOffset === null) topOffset = 0;
				if (arguments.length < 3 || speedFactor === null) speedFactor = 0.1;
				if (arguments.length < 4 || outerHeight === null) outerHeight = true;
			
				// function to be called whenever the window is scrolled or resized
				function update() {
                    window.requestAnimationFrame(function(){
                        var pos = $window.scrollTop();

                        $this.each(function () {
                            var $element = $(this);
                            var top = $element.offset().top;
                            var height = getHeight($element);
        
                            // Check if totally above or totally below viewport
                            if (top + height < pos || top > pos + windowHeight) {
                                return;
                            }

                            $this.css('backgroundPosition', xpos + " " + Math.round(((firstTop - pos) * speedFactor)-topOffset) + "px");
                        });
                    });    
				}
                
                 window.addEventListener("scroll", update);
                 update();
				 //$window.bind('scroll', window.requestAnimationFrame(update)).resize(window.requestAnimationFrame(update));
			};
            
    }
}

