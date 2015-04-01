jQuery(function ($) {
	$(document).ready(function() {


		var currentPosition = 0;
		var newPosition = 0;
		var slideWidth = 1000;
		var slides = $('.slide');
		var numberOfSlides = slides.length;
		var slideShowInterval;
		var speed = 1000;

		$(".w-gallery").addClass('gray');

		$("#pageSlide"+currentPosition).find('.w-gallery').removeClass('gray');


		$('.w-pagehead')
		.prepend('<span class="nav" id="rightNav">&raquo;</span><span class="nav" id="leftNav">&laquo;</span>');


		//slideShowInterval = setInterval(changePosition, speed);

		slides.wrapAll('<div id="slidesHolder"></div>')

		slides.css({ 'float' : 'left' });

		$('#slidesHolder').css('width', (numberOfSlides * 100)+"%");
		$(".slide").css("width", (100/numberOfSlides)+"%");

		$('.g-cols').hide();
		$('.slide .g-cols:first-child').show();
		$("#pageSlide"+(currentPosition)).find('.g-cols').show();

		//loop slides, move last element to the left

		var moveDiv = $("#pageSlide"+(numberOfSlides-1));
		moveDiv.insertBefore($("#pageSlide0"));
		moveDiv.css('margin-left', -slideWidth);


		$('.one-third').find('.wpb_wrapper').css('padding-left', '15px');
		$('.one-third').find('.wpb_wrapper').find('strong').css('margin-left', '-15px');


		function changePosition() {
			if(currentPosition == numberOfSlides - 1) {
				currentPosition = 0;
				//manageNav(currentPosition);
			} else {
				currentPosition++;
				//manageNav(currentPosition);
			}
			moveSlide();
		}


		function moveSlide() {
			$(".w-gallery").addClass('gray');
			$("#pageSlide"+currentPosition).find('.w-gallery').removeClass('gray');
			$("#pageSlide"+currentPosition).find('.g-cols').show();
			$("#pageSlide"+(currentPosition+1)).find('.g-cols').first().show();
		}

		function manageNav(position) {
			//hide left arrow if position is first slide
			//if(position==0){ $('#leftNav').hide() }
			//else { $('#leftNav').show() }
			//hide right arrow is slide position is last slide
			//if(position==numberOfSlides-1){ $('#rightNav').hide() }
			//else { $('#rightNav').show() }
		}

		//manageNav(currentPosition);

		$('.nav').bind('click', function() {
			//determine new position
			if($(this).attr('id')=='rightNav'){
				$("#pageSlide"+currentPosition).animate({'marginLeft' : '-='+slideWidth}, speed, 'linear');
				//$('#slidesHolder').animate({'marginLeft' : -slideWidth});
				if(currentPosition == 0)
					var moveDiv = $("#pageSlide"+(numberOfSlides-1));
				else
					var moveDiv = $("#pageSlide"+(currentPosition-1));
				//console.log("initial position " + currentPosition );
				//console.log("moving slide " + moveDiv.attr('id') );
				//change position to the next
				if(currentPosition == numberOfSlides-1) {
					currentPosition = 0;
				}
				else {
					currentPosition++;
				}
				var moveTo;
				moveTo = currentPosition+(numberOfSlides-3);
				if(moveTo >= numberOfSlides) {
					moveTo = moveTo-numberOfSlides;
				}

				//console.log("new position " + currentPosition );
				moveDiv.animate({'marginLeft' : '-='+(slideWidth/2)}, (speed/2),  'linear',
					function(){
						moveDiv.insertAfter($("#pageSlide"+(moveTo)));
						moveDiv.css('margin-left', 0);
					}
					);
				//moveDiv.insertAfter($("#pageSlide"+currentPosition));
				//moveDiv.css('margin-left', 0);
				//alert(currentPosition+" "+numberOfSlides);


			}
			else {


				var moveDiv = (currentPosition+(numberOfSlides-2));

				if(moveDiv > (numberOfSlides-1)) {
					moveDiv = moveDiv - numberOfSlides;
				}

				var moveTo = currentPosition-1;



				if(moveTo < 0) {
					moveTo = numberOfSlides + moveTo;
				}


				if(currentPosition == 0) {
					currentPosition = numberOfSlides-1;
				}
				else {
					currentPosition--;
				}
				$("#pageSlide"+currentPosition).animate({'marginLeft' : '+='+slideWidth}, speed, 'linear');


				$("#pageSlide"+moveDiv).insertBefore($("#pageSlide"+currentPosition));
				$("#pageSlide"+moveDiv).css('margin-left', -slideWidth*2);
				$("#pageSlide"+moveDiv).animate({'margin-left': -slideWidth}, speed, 'linear');

			};
			$('.g-cols').hide();
			$('.slide .g-cols:first-child').show();
			$("#pageSlide"+(currentPosition)).find('.g-cols').fadeIn("slow");

			//hide/show controls
			manageNav(currentPosition);
			//clearInterval(slideShowInterval);
			//slideShowInterval = setInterval(changePosition, speed);
			moveSlide();
		});

	});
});