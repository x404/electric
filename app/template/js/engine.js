$(document).ready(function(){

	$('#foo1').bxSlider({
		mode: "fade",
		controls: false
	});

	// $('#foo2').bxSlider({
	// });

	// карусель
	$('#foo2').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:3,
		navText: ["", ""],
		responsive:{
			0:{
				items:1,
				stagePadding: 15
			},
			335:{
				items:1,
				stagePadding: 30
			},
			380:{
				items:1,
				stagePadding: 30
			},			
			415:{
				items:1,
				stagePadding: 40
			},
			525:{
				items:1,
				stagePadding: 80
			},
			767:{
				items:1,
				stagePadding: 0
			},
			991:{
				items:2
			},
			1450:{
				items:3
			}
		}
	});


	// policy
	$('.policy input').click(function(){
		var $this = $(this),
			$submit = $this.closest('.form-policy');

		if ($this.is(':checked')){
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').removeAttr('disabled');
		} else {
			$submit.addClass('disabled');
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').attr('disabled', true);
		}
	});	


	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				h = $(document).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				$('#navbar').height('auto');
			};
		init();
	});	
});

// =заглушка для IE
//event listener: DOM ready
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
//call plugin function after DOM ready
addLoadEvent(function(){
	outdatedBrowser({
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform',
		languagePath: '/outdatedbrowser/lang/ru.html'
	})
});
// =/заглушка для IE
