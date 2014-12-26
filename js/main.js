$(document).ready(function(){

		var lastScrollTop = 0;
		var currentPage = "home";
		var bg = $('.bg');
		var pages = $('.pages');

		var scrollActive = true;

		var vh = window.innerHeight;
		var vw = window.innerWidth;

		bg.find('li:not(".current-bg")').fadeOut('slow');


		$('.navigation').on('mouseover', function(){
			$(this).css('width', '25vw');
		});

		$('.navigation').on('mouseout', function(){
			$(this).css('width', '9vw');
		});

		var bgSlideshow = setInterval(function(){
			var currentBg = $('.current-bg');
			var nextBg = currentBg.next();

			if(nextBg.length==0)
				nextBg = currentBg.prevAll().last();

			nextBg.fadeIn(2000);currentBg.fadeOut(2000);
			nextBg.addClass('current-bg');
			currentBg.removeClass('current-bg');
		}, 6000);
		
		// $('#sb-slider').slicebox({
		// 	orientation: 'r',
		// 	autoplay : true,
		// 	speed: 1000,
		// 	interval: 5000,
		// 	cuboidsCount: 1,
		// });

		// $('.pages').curtain({
		// 	scrollSpeed: 900
		// });

		var onScroll = function(event){
				// console.log(scrollActive);
				// 	if(!scrollActive){
				// 		console.log('scroll not active');
				// 		return;}

		
					var st = $(window).scrollTop();
					
		   			if (st > lastScrollTop){
		       				slidePage('next');
		   					} 
		   			else if(st < lastScrollTop) {
		   					slidePage('prev');
		     	   			}
		  			 lastScrollTop = st;

		  			 

		}

		$(window).on('scroll',onScroll);

		function slidePage(dir){
			
			$(window).off('scroll',onScroll);
			var activePage = $('.active-page');
			if(dir=='next')
			var nextPage = activePage.next();
			else
				var nextPage = activePage.prev();

			if(nextPage.length==0)
				return;

			currentPage = nextPage.attr('id');
			activePage.removeClass('active-page');
			nextPage.addClass('active-page');

			if(currentPage=='home'){
				$('.navigation').css('width', '0vw');
				setTimeout(function(){scrollAnim(nextPage.offset().top, dir); }, 300);
			}
			else
				scrollAnim(nextPage.offset().top, dir);
				// $('.logo').css('margin-left', '0vw');}
			
			


		}

		

		function scrollAnim(pos, dir)
			{
				$('.navigation').css('top',pos+'px');
		$('body, html').animate({
			scrollTop : pos
		}, 500, function(){
			lastScrollTop = pos;
			$(window).on('scroll',onScroll);
			
			if(dir=='next'&&currentPage=='nights')
				$('.navigation').css('width', '9vw');
				// $('.logo').css('margin-left', '8vw');}
		})
			}

			var controls = $('.slide-controls');
			controls.children('li').on('click', function(event) {
				event.preventDefault();
				var dir = $(this).attr('id');
				var slides = $(this).parent().siblings('.slides');
				slideChange(slides, dir);
			});

			function slideChange(slides, dir){
				var ontop = slides.find('.ontop');

				if(dir=='next'){
				var nextontop = ontop.next();
				if(nextontop.length==0)
					nextontop = ontop.prevAll().last();
								}
			else{
				nextontop = ontop.prev();
				if(nextontop.length==0)
					nextontop = ontop.nextAll().last();
				}

				slides.css('left', '-'+(nextontop.index()*100)+'vw');

				nextontop.addClass('ontop');
				ontop.removeClass('ontop');
			}


});
