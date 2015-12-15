var votex = angular
// Momentan keine Funktion
.module('starter.controllers');
votex.factory('viewFactory', function($rootScope){
	var sharedFactory = {};
	var viewPlace;
	
	sharedFactory.viewMain = function(place){
	
		
	};
	
	sharedFactory.setPlace = function(object) {
	object = viewPlace;
	return object;	
	}
	
	
return sharedFactory;
	
	
});

