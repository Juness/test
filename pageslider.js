jQuery(function ($) {
	$(document).ready(function() {

		//var oldPosition = -1;
		var currentPosition = 0;
		var newPosition = 0;
		var slideWidth = 1000;
		var slides = $('.slide');
		var numberOfSlides = slides.length;
		var slideShowInterval;
		var speed = 1000;



		$(".slotholder").addClass('gray');

		$("#pageSlide"+currentPosition).find('.slotholder').removeClass('gray');




		$('.w-pagehead')
		.prepend('<span class="nav" id="rightNav">&raquo;</span><span class="nav" id="leftNav">&laquo;</span>');


		//slideShowInterval = setInterval(changePosition, speed);

		slides.wrapAll('<div id="slidesHolder"></div>')

		slides.css({ 'float' : 'left' });

		//$('#slidesHolder').css('width', slideWidth * numberOfSlides);
		$('#slidesHolder').css('width', (numberOfSlides * 100)+"%");
		$(".slide").css("width", (100/numberOfSlides)+"%");


		$('.g-cols').hide();
		$('.slide .g-cols:first-child').show();
		$("#pageSlide"+(currentPosition)).find('.g-cols').show();
		$('.parent-page-content').find('.g-cols').show();

		//loop slides, move last element to the left
		//if(currentPosition == 0){
			var moveDiv = $("#pageSlide"+(numberOfSlides-1));
			moveDiv.insertBefore($("#pageSlide0"));
			moveDiv.css('margin-left', -slideWidth);

		//};



		/*function changePosition() {
			if(currentPosition == numberOfSlides - 1) {
				currentPosition = 0;
			} else {
				currentPosition++;
			}
			moveSlide();
		}*/
		function changePosition() {
			if(currentPosition == numberOfSlides - 1) {
				currentPosition = 0;
				manageNav(currentPosition);
			} else {
				currentPosition++;
				manageNav(currentPosition);
			}
			moveSlide();
		}


		function moveSlide() {
			//$('#slidesHolder').animate({'marginLeft' : slideWidth*(-currentPosition)});
			//$('#slidesHolder').animate({'marginLeft' : -slideWidth});

			$(".slotholder").addClass('gray');
			$("#pageSlide"+currentPosition).find('.slotholder').removeClass('gray');
			$("#pageSlide"+currentPosition).find('.g-cols').show();
			$("#pageSlide"+(currentPosition+1)).find('.g-cols').show().hide();
			$("#pageSlide"+(currentPosition+1)).find('.g-cols').first().show();
			$('.parent-page-content').find('.g-cols').show();


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
				//console.log("new position " + currentPosition );
				moveDiv.animate({'marginLeft' : '-='+(slideWidth/2)}, (speed/2),  'linear',
					function(){
						moveDiv.insertAfter($("#pageSlide"+currentPosition));
						moveDiv.css('margin-left', 0);
					}
					);
				//moveDiv.insertAfter($("#pageSlide"+currentPosition));
				//moveDiv.css('margin-left', 0);
				//alert(currentPosition+" "+numberOfSlides);
			}
			else {

				if(currentPosition == numberOfSlides-1)
					var moveDiv = $("#pageSlide0");
				else
					var moveDiv = $("#pageSlide"+(currentPosition+1));

				if(currentPosition == 0) {
					currentPosition = numberOfSlides-1;
				}
				else {
					currentPosition--;
				}
				$("#pageSlide"+currentPosition).animate({'marginLeft' : '+='+slideWidth}, speed, 'linear');
				moveDiv.insertBefore($("#pageSlide"+currentPosition));
				moveDiv.css('margin-left', -slideWidth*2);
				moveDiv.animate({'margin-left': -slideWidth}, speed, 'linear');

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