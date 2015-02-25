var flagshipTemplate ='<li class="$eventID inside slide" id="$eventID"><img src="$eventImage" alt="$eventID" class="bg-image" /><div class="title"><p class="heading move-up fade anim gue">$eventName</p><button class="details move-up fade anim"><i class="fa fa-file-text-o"></i><span>Get the details</span></button></div><p class="desc move-right anim fade">$eventShortDescription</p><div class="details-box" id="e-boot"><i class="fa fa-close fa-2x"></i>$eventDescription<a class="details-pdf" target="_blank" href="$eventDetails"><button class="pdf"><i class="fa fa-file-text-o"></i><span>Get the PDF</span></button></a><!--<button class="event-register"><i class="fa fa-plus"></i><span>Register for the event</span></button>--></div></li>';

function getRegisterFormData(){
    var ret = {};
    ret['tel'] = $('#tel').val();
    ret['college'] = $('#college').val();
    ret['city'] = $('#city').val();
    ret['state'] = $('#state').val();
    console.log(ret);
    return ret;
}
function alertify(msg, success)
{
    var alertBox = $('#alert');
    if(success)
    {
        alertBox.css('background', 'green');
    }
    else
    {
        alertBox.css('background', 'red');
    }

    alertBox.text(msg);
    alertBox.velocity({
        top:0
    },
    {
        duration : 1000
    }).velocity({
        top: '-35px'
    },
    {
        duration : 1000,
        delay: 2000
    });
};

function renderTemplate(template, variables, target){
    for(var i = 0;i<variables.length;i++){
        var curTemp = template;
        for(var k in variables[i]){
            console.log(k);
            curTemp = curTemp.replace(new RegExp('\\$'+k, 'g'), variables[i][k]);
        }
        $(curTemp).appendTo(target);
    }
}
$.getJSON('api/categories.php', function(data){
    renderTemplate(flagshipTemplate, data['flagship'], '#national .slides');
    $('.details-box .fa-close').on('click', function(){
        $(this).parent().css('display', 'none');
    });
    $('button.details').on('click', function(){
        $(this).parent().siblings('.details-box').css('display', 'block');
    });
});
$.getJSON('api/fb.php?format=json', function(data){
    if(data['logged_in'] == 1){
        var bannerMsg = '<i class="fa fa-info"></i><span class="hello-banner">Hi ' + data['first_name']+'</span>';
        $('#loginButton').attr('href', 'javascript:return false;');
        $('#loginButton button').html(bannerMsg);
        $('#login').show();
        $('#loginButton').click(function(){
            $('#reg').css('display', 'block');
        });
        $('#register #submit').click(function(e){
            $.post("api/register.php", getRegisterFormData()).done(function(data){
                data = JSON.parse(data);
                if(data['ok'] == 1){
                    // OK
                    $("#reg").css('display', 'none');
                    alertify("Registration Successful", true);
                    $('#loginButton button').html(bannerMsg);
                }else{
                    alertify("Error Occurred", false);
                    // Not OK
                }
                return false;
            }).fail(function(){
                alertify("Error Occurred", false);
            });
            return false;
        });
        if(!data['newUser']){
            try{
                $('#tel + label').css('top', '-55%');
                $('#city + label').css('top', '-55%');
                $('#state + label').css('top', '-55%');
                $('#college + label').css('top', '-55%');
                $('#tel').val(data['phone']);
                $('#city').val(data['city']);
                $('#state').val(data['state']);
                $('#college').val(data['college']);
            }catch(e){
                console.log(e);
            }
        }else{
            $('#loginButton button .hello-banner').append(', click here');
            $('#loginButton button .hello-banner').css('font-size', '85%');
        }
    }else{
        $('#loginButton').attr('href', data['login_url']);
    }
});
$(document).ready(function(){
    (function removeFacebookAppendedHash() {
        if (!window.location.hash || window.location.hash !== '#_=_')
            return;
        if (window.history && window.history.replaceState)
            return window.history.replaceState("", document.title, window.location.pathname);
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        };
        window.location.hash = "";
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
    }());
});
$(document).ready(function(){

		var lastScrollTop = 0;
		var currentPage = "home";
		var bg = $('.bg');
		var pages = $('.pages');
			var delayScroll;
		var scrollActive = true;

		var vh = window.innerHeight;
		var vw = window.innerWidth;

		var audio = document.getElementById('bg-audio');
		var songIndex = 1;

		var reg = $('#reg');
		var log = $('#user-login');
		var forms = $('.forms');
			var register = $('.register');

			var navLinkClicked = false;
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
				//alertify('thats all folks!', false);
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
			clearTimeout(delayScroll);
			navLinkClicked = true;
			var nextPage = $(this).attr('id');

			if(nextPage==currentPage)
				return false;
			var currIndex = $('li#'+currentPage).index();
			var nextIndex = $('li#'+nextPage).index();

			
			var dir;
			if(currIndex<nextIndex)
				dir = 'next';
			else
				dir = 'prev';
			console.log('sliding page from '+currentPage+' to '+nextPage+'('+(currIndex-nextIndex)+')');
			var i;
			$(window).off('scroll', onScroll);
			for(i=0;i<Math.abs(currIndex-nextIndex); i++){
				console.log(i+1);
				slidePage(dir);
			}
			delayScroll = setTimeout(function(){
			navLinkClicked = false;
			$(window).on('scroll', onScroll);
		}, 3000);
			
					});

		var onScroll = function(event){
				// console.log(scrollActive);
				// 	if(!scrollActive){
				// 		console.log('scroll not active');
				// 		return;}

					console.log('window scrolled');
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
			console.log('navLinkClicked '+navLinkClicked);
			if(!navLinkClicked)
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

			$('.slides').delegate('.slide','mousedown', function(event){
				event.stopPropagation();
				console.log('mouse down on '+$(this).attr('class'));
				isMouseDown = true;
				mouseDownX = event.clientX;
				mouseDownY = event.clientY;
				//lastSlideLeft = $(this).parent().css('left');
			})

			$('.slides').delegate('.slide','mouseup', function(event){
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
				//$(this).css('margin-left', 0);
			});


			$('.slides').delegate('.slide','mousemove', function(event){
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
					if(((dir=='prev'&&$(this).index()==0)||((dir=='next')&&$(this).next().length==0))&&(Math.abs(diff)>250))
					{
						
						$(this).parent().velocity({
					marginLeft: 0,
					},
					{duration : 200,
					});

						
						isMouseDown = false;
						return false;
						
					}


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

				console.log('next : '+nextontop.attr('id'));
								}
			else{
				nextontop = ontop.prev();
				if(nextontop.length==0)
					nextontop = ontop.nextAll().last();

				console.log('prev : '+nextontop.attr('id'));
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
//			login.on('click', logIn);

			$('input').on('focus', function(e){
				$(this).siblings('label').css('top','-55%');
			})

			
/*			register.on('click', function(){
				reg.css('display', 'block');
				//$(window).off('scroll', onScroll);
			})*/

			// $('#login').on('click', function(){
			// 	log.css('display', 'block');
			// })
			$('.fa-close').on('click', function(){
				hideForms();
			})

			function hideForms(){
				forms.css('display', 'none');
				//$(window).on('scroll', onScroll);
			}

			$('.category, .event-cat').on('click', function(){
				var eventCat = $('.event-cat');
				eventCat.toggleClass('visible');
			})

});
