$( document ).ready(function(){

	$(".button-collapse").sideNav();
	$('.slider').slider({
		full_width: true,
		indicators: false
	});
	$('.modal-trigger').leanModal();
	$('select').material_select();

	$('.title_service').on('click', function(){
		var nextDesc = $(this).next('.service_desc');

		if (nextDesc.hasClass('open'))
			nextDesc.removeClass('open').slideUp();
		else{
			$('.service_desc').removeClass('open').slideUp();
			nextDesc.addClass('open').slideDown();
		}

	});

	switch(window.location.pathname.split('/')[1]){
		case '':
		case 'es':
		case 'en':
		case 'ca':

			$('.nav-wrapper li:nth-of-type(1) a').addClass('active');
			if (getURLParameter('send') === 'true')
				Materialize.toast('Tu mensaje ha sido enviado con éxito', 4000);
			if (getURLParameter('log') === 'true')
				Materialize.toast('Se ha logueado con éxito', 4000);
			break;

		case 'equipo':
			$('.nav-wrapper li:nth-of-type(2) a').addClass('active');
			break;
		case 'servicios':
			$('.nav-wrapper li:nth-of-type(3) a').addClass('active');
			break;
		case 'contacto':
			$('.nav-wrapper li:nth-of-type(4) a').addClass('active');
			break;
	}
});

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
