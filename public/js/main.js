$( document ).ready(function(){
	$(".button-collapse").sideNav();
	$('.slider').slider({
		full_width: true,
		indicators: false
	});
	$('.modal-trigger').leanModal();




	switch(window.location.pathname){
		case '/':
			$('.nav-wrapper li:nth-of-type(1) a').addClass('active');
			if (getURLParameter('send') === 'true')
				Materialize.toast('Tu mensaje ha sido enviado con éxito', 4000);
			if (getURLParameter('log') === 'true')
				Materialize.toast('Se ha logueado con éxito', 4000);
			break;

		case '/equipo':
			$('.nav-wrapper li:nth-of-type(2) a').addClass('active');
			break;
		case '/servicios':
			$('.nav-wrapper li:nth-of-type(3) a').addClass('active');
			break;
		case '/contacto':
			google.maps.event.addDomListener(window, 'load', initializeBogota);
			google.maps.event.addDomListener(window, 'load', initializeBarcelona);
			google.maps.event.addDomListener(window, 'load', initializeLima);

			$('.nav-wrapper li:nth-of-type(4) a').addClass('active');
			break;
	}
});

function initializeBogota() {
	var mapCanvas = document.getElementById('map-canvas-bogota');
	var mapOptions = {
		center: new google.maps.LatLng(21.1639716, -86.84478990000002),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	var map = new google.maps.Map(mapCanvas, mapOptions);
}
function initializeBarcelona() {
	var mapCanvasBar = document.getElementById('map-canvas-barcelona');
	var mapOptionsBar = {
		center: new google.maps.LatLng(21.1639716, -86.84478990000002),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	var map = new google.maps.Map(mapCanvasBar, mapOptionsBar);
}
function initializeLima() {
	var mapCanvasBar = document.getElementById('map-canvas-lima');
	var mapOptionsBar = {
		center: new google.maps.LatLng(21.1639716, -86.84478990000002),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	var map = new google.maps.Map(mapCanvasBar, mapOptionsBar);
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
