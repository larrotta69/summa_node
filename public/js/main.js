$( document ).ready(function(){
	$(".button-collapse").sideNav();
	$('.slider').slider({
		full_width: true,
		indicators: false
	});
	$('.modal-trigger').leanModal();

	google.maps.event.addDomListener(window, 'load', initializeBogota);
	google.maps.event.addDomListener(window, 'load', initializeBarcelona);
});
 
function initializeBogota() {
	var mapCanvas = document.getElementById('map-canvas-bogota');
	var mapOptions = {
		center: new google.maps.LatLng(21.1639716, -86.84478990000002),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	var map = new google.maps.Map(mapCanvas, mapOptions)
}
function initializeBarcelona() {
	var mapCanvas = document.getElementById('map-canvas-barcelona');
	var mapOptions = {
		center: new google.maps.LatLng(41.379623, 2.140651),
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	var map = new google.maps.Map(mapCanvas, mapOptions)
}