$(document).ready(function(){

		var lastScrollTop = 0;
		var currentPage = "home";
		var bg = $('.bg');
		var pages = $('.pages');

		var scrollActive = true;

		var vh = window.innerHeight;
		var vw = window.innerWidth;

		var audio = document.getElementById('bg-audio');
		var songIndex = 1;

		var reg = $('#reg');
		var log = $('#user-login');
		var forms = $('.forms');
			var register = $('.register');

			hideForms();

		//audio config
			audio.volume = 0.4;
			$('.play').on('click', function(){
				//$(this).css('display', 'none');
				$('.pause').css('display', 'block');
				audio.play();
			})

			$('.pause').on('click', function(){
				$(this).css('display', 'none');
				audio.pause();
			})

			$('#backward, #forward').on('click', function(){
				var currentSong = $('.current-song');
				(currentSong).replaceWith((currentSong).clone(true));
				//currentSong.css('opacity', '0.3');
				//console.log('next-prev');
		});

			$('#forward').on('click', function(){
				changeSong('next');
			})

			$('#backward').on('click', function(){
				changeSong('prev');
			})

			function changeSong(dir)
			{
				console.log(dir+' song');
			}
		//audio config ends

		bg.find('li:not(".current-bg")').velocity('fadeOut', {duration: 'slow'});

		

		var navMouseOver = function(){
			$(this).css('width', '25vw');
			$(this).off('mouseover', navMouseOver);
			$('.name-link').each(function(index, el) {
				$(el).replaceWith($(el).clone(true));
			});

			$('.navigation .fade').on('webkitAnimationEnd oanimationend mozAnimationEnd msAnimationEnd animationend', function(e){
			$(this).css('opacity', '1');
		});
			}

		$('.navigation').on('mouseover', navMouseOver);

		// $('.navigation').on('transitionend', function(event) {
		// 	event.preventDefault();
			
		// });

		$('.navigation').on('mouseleave', function(){
			$(this).css('width', '9vw');
			$('.navigation .fade').css('opacity','0');
			$(this).on('mouseover', navMouseOver);
			
		});

		var bgSlideshow = setInterval(function(){
			var currentBg = $('.current-bg');
			var nextBg = currentBg.next();

			if(nextBg.length==0)
				nextBg = currentBg.prevAll().last();

			nextBg.velocity('fadeIn', {duration: 2000});
			currentBg.velocity('fadeOut', {duration: 2000});
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

		var pageLink = $('.page-link');

		pageLink.on('click', function(event) {
			event.preventDefault();
			var nextPage = $(this).attr('id');

			if(nextPage==currentPage)
				return false;
			var currIndex = $('li#'+currentPage).index();
			var nextIndex = $('li#'+nextPage).index();

			console.log(nextPage+": "+nextIndex);
			var dir;
			if(currIndex<nextIndex)
				dir = 'next';
			else
				dir = 'prev';

			var i;
			for(i=0;i<Math.abs(currIndex-nextIndex); i++){
				slidePage(dir);
			}
					});

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
			$('.active-page .fade').css('opacity', '0');
			var activePage = $('.active-page');
			if(dir=='next')
			var nextPage = activePage.next();
			else
				var nextPage = activePage.prev();

			if(nextPage.length==0)
				return;

			var navLinkIcon = $('.page-link i.active');
				navLinkIcon.removeClass('active')

			currentPage = nextPage.attr('id');
			activePage.removeClass('active-page');
			nextPage.addClass('active-page');

			if(currentPage=='home'){
				$('.navigation').css('width', '0vw');
				setTimeout(function(){scrollAnim(nextPage.offset().top, dir);$('.navigation').css('width', '0vw'); }, 300);
			}
			else
				scrollAnim(nextPage.offset().top, dir);
				// $('.logo').css('margin-left', '0vw');}

				navLinkIcon = $('a#'+currentPage+' i');
				navLinkIcon.addClass('active')
			
			console.log('current page: '+currentPage);

		}

		function startAnimation(el)
		{
			el.find('.anim').each(function(index, el){
				$(el).replaceWith($(el).clone(true));
			});

			el.find('.fade').on('webkitAnimationEnd oanimationend mozAnimationEnd msAnimationEnd animationend', function(e){
			$(this).css('opacity', '1');
		});
		}

		

		function scrollAnim(pos, dir)
			{
				$('.navigation').css('top',pos+'px');
		$('body, html').velocity("scroll", 
			{duration: 500,
			 offset: pos,
			 axis: 'y',
			 easing: 'easeInSine', 
			 complete: function(){
		lastScrollTop = pos;
			$(window).on('scroll',onScroll);
			
			if(dir=='next'&&currentPage=='nights')
				$('.navigation').css('width', '9vw');

			startAnimation($('#'+currentPage+' .ontop'));
				// $('.logo').css('margin-left', '8vw');}
		}
			});
	}

			var controls = $('.slide-controls');
			controls.children('li').on('click', function(event) {
				event.preventDefault();
				var dir = $(this).attr('id');
				var slides = $(this).parent().siblings('.slides');
				slideChange(slides, dir);
			});

			$(document).on('keydown', function(event){
				var dir = 'none';
				if(event.which==37)
					dir = 'prev';
				else if(event.which==39)
					dir = 'next';
				
				if(dir!='none')
				{
					event.preventDefault();
				slideChange($('.'+currentPage).children('.slides'),dir);
				}
			});

			var isMouseDown = false;
			var mouseDownX, mouseDownY, mouseUpX;
			var lastMarginLeft = 0;

			var slide = $('.slides>li');

			slide.on('mousedown', function(event){
				event.stopPropagation();
				console.log('mouse down on '+event.target);
				isMouseDown = true;
				mouseDownX = event.clientX;
				mouseDownY = event.clientY;
				//lastSlideLeft = $(this).parent().css('left');
			})

			slide.on('mouseup', function(event){
				event.stopPropagation();
				console.log('mouse down off '+event.target);

				if(isMouseDown)
					isMouseDown = false;
				else
					return false;
				var dir;
				mouseUpX = event.clientX;
				var diff = mouseUpX-mouseDownX;
				if(diff>0)
					dir= 'prev';
				else if(diff<0)
					dir = 'next';
				else
					return false;

				if((dir=='prev'&&$(this).index()==0)||(dir=='next')&&$(this).next().length==0)
					{
						$(this).parent().velocity({
					marginLeft: 0,
					},
					{
					duration: 100, complete: function() {
					/* stuff to do after animation is complete */
				}
			});
				return false;
			}

				slideChange($(this).parent(), dir);
				//$(this).parent().css('margin-left', 0);
			});


			slide.on('mousemove', function(event){
				event.stopPropagation();
				var mouseMoveX = event.clientX;

				if(isMouseDown)
				{
					var diff = mouseMoveX-mouseDownX;
				if(diff>0)
					dir= 'prev';
				else if(diff<0)
					dir = 'next';
				// 	lastMarginLeft = diff;
				// 	if(((dir=='prev'&&$(this).index()==0)||((dir=='next')&&$(this).next().length==0))&&(diff>250))
				// 	{
				// 		$(this).parent().animate({
				// 	marginLeft: 0,
				// 	},
				// 	200, function() {
				// 	/* stuff to do after animation is complete */return false;
				// });
						
				// 	}


					$(this).parent().css('margin-left', diff+'px');
				}
				else
					return false;
			})




			function slideChange(slides, dir){
				var ontop = slides.find('.ontop');
				$('.ontop .fade').css('opacity', '0');
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

				ontop.removeClass('ontop');
				nextontop.addClass('ontop');

				slides.velocity({left: '-'+(nextontop.index()*100)+'vw'}
					,
					{
						duration: 500,
						easing: [0.175, 0.885, 0.320, 1.275]
					}).velocity({
					marginLeft: 0,
					},
					{duration: 100, complete: function() {
					/* stuff to do after animation is complete */
					startAnimation($('#'+currentPage+' .ontop'));
				}
			});
				
				


				
			}

			function logIn(e){
				e.preventDefault();
				//console.log('login');
			}

			var login = $('#login');
			login.on('click', logIn);

			$('input').on('focus', function(e){
				$(this).siblings('label').css('top','-55%');
			})

			
			register.on('click', function(){
				reg.css('display', 'block');
				//$(window).off('scroll', onScroll);
			})

			$('#login').on('click', function(){
				log.css('display', 'block');
			})
			$('.fa-close').on('click', function(){
				hideForms();
			})

			function hideForms(){
				forms.css('display', 'none');
				//$(window).on('scroll', onScroll);
			}

			$('.category').on('click', function(){
				var eventCat = $('.event-cat');
				eventCat.toggleClass('visible');
			})

});
