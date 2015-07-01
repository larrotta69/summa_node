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