var votex = angular
.module('starter.premiumCtrl', ['chart.js'])
.controller("premiumCtrl", function ($scope) {

	  $scope.labels = [ "16-18 Jährige", "18-20 Jährige","24-26 Jährige"];
  $scope.data = [400, 500, 100];
  
   $scope.months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli"];
  $scope.series = ['Filiale A', 'Filiale B'];
  $scope.dataMonths = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  
  
  
    $scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];


  $scope.data2 = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  

});
	 
 