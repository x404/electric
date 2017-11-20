$(document).ready(function(){
	$('#foo1').bxSlider({
		mode: "fade",
		controls: false
	});

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
				stagePadding: 8
			},
			335:{
				items:1,
				stagePadding: 15
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
				items:2,
				stagePadding: 0
			},
			1199:{
				items:3
			}
		}
	});

	// отзывы
	$('#foo3').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:1,
		navText: ["", ""],
		responsive:{
			0:{
				stagePadding: 8
			},
			335:{
				stagePadding: 15
			},
			380:{
				stagePadding: 30
			},			
			550:{
				stagePadding: 0
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


	$('a.fancybox').fancybox()

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

	$(window).resize(function(){
		if ($('body').width() > 640) {
			$('body').removeClass('o-menu');
			$('#navbar').css('height', 'auto');
		}
	});


	$('.rubrics__nav a').click(function(e){
		e.preventDefault();
		var $this = $(this),
			target = $this.data('target');

		$('.rubrics__nav a.current').removeClass('current');
		$this.addClass('current');
		$('.rubrics__body .tab-current').removeClass('tab-current');
		$(target).addClass('tab-current');
	});


	$('#infomodal').on('show.bs.modal', function (e) {
		var $this = $(e.relatedTarget),
			id = $this.data('id'),
			title = $this.data('title'),
			url = id,
			posting = $.post(id);

		$.ajax('/' + url, 'POST').then(function(data) {
			$('#infomodal .title').text(title);
			$('#infomodal .modal__text').html(data);
		});
	});

});



var thankTxt = '<div class="thank text-center"><p>Спасибо! Ваше сообщение успешно отправлено</p></div>',
	thankcallback = '<div class="thank text-center"><p>В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей.</p></div>',
	errorTxt = 'Возникла ошибка';

// validation
$('#feedback-form').validate({
	submitHandler: function(form){
		var strSubmit=$(form).serialize();
		$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
			success: function(){
				$('.feedback__form').append(thankTxt);
				$('.feedback__form fieldset').hide();
				startClock('feedback-form');
			}
		}).fail(function(error){alert(errorTxt)});
	}
}); 

// validation callback form
$('#callback-form').validate({
	submitHandler: function(form){
		var strSubmit=$(form).serialize();
		$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
			success: function(){
				console.log("success");
				$('#callback-form').html(thankcallback);
				startClock('callback');
			}
		}).fail(function(error){alert(errorTxt)});
	}
}); 


// validation writeus form
$('#writeus-form').validate({
	submitHandler: function(form){
		var strSubmit=$(form).serialize();
		$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
			success: function(){
				console.log("success");
				$('#writeus-form').html(thankcallback);
				startClock('writeus');
			}
		}).fail(function(error){alert(errorTxt)});
	}
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


var timer,
	sec = 3;

function showTime(sendform){
	sec = sec-1;
	if (sec <=0) {
		stopClock();

		switch (sendform){
			case '----qorder-form':
				$('.qorder__box .thank').fadeOut('normal',function(){
					$('.qorder__box .thank').remove();
					$('.qorder__box .form-control, .qorder__box textarea').val('');
				});
				break;

			case 'feedback-form':
				$('.feedback .thank').fadeOut('normal',function(){
					$('.feedback .thank').remove();
					$('.feedback .form-control, .feedback textarea').val('');
					$('.feedback__form fieldset').show();
				});
				break;
			default:
				modal = $("#" + sendform).closest('.modal');
				modal.fadeOut('normal',function(){
					modal.modal('hide');
				});
				break;
		}
	}
}
function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(sendform){
	if (!timer)
		timer = window.setInterval("showTime('" + sendform + "')",1000);
}


// показываем второй  уровень меню
$(document).on('click', '.o-menu .folder > a, .o-menu .folder > span', function(e){
	e.preventDefault();
	var $this = $(this);
	$this.next('.subnav').slideToggle().prev().toggleClass('open');
})
