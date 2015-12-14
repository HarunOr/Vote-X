 var votex = angular
 
  .module('starter.controllers', [ 'ui.bootstrap','ionicLazyLoad','google.places',
                                   'ngMap','firebase'])

  votex.controller('AppCtrl', function ($scope,viewFactory, $http,$ionicPlatform,
                                   $state, $ionicModal, $timeout, 
                                   $ionicPopup, $cordovaOauth, $rootScope,
                                   $ionicLoading, $ionicScrollDelegate, $firebaseArray, $window
                                    )    {

 var ref = new Firebase("https://vote-x.firebaseio.com/");
 $scope.searched = false;
//----------------------------- Search ------------------------------------
   

   
   
   
   
 $scope.se = function() {
             
                if($scope.input != null &&$scope.input.place_id != undefined) {  
     
     $scope.searched = true;
    
     $scope.isGoogle = "false"; //ng-if Info
     
                   $ionicLoading.show({
                     
      noBackdrop: true,
      template: '<p class="item-icon-left">Wird geladen...<ion-spinner icon="lines"/></p>'
    });
                
                
                $scope.place = $scope.input;
                $rootScope.placeObject = $scope.place;
            $scope.icon = $scope.place.icon;
        
            $timeout(function(){
                
                   $scope.dynamicName = $scope.place.name; 
                   
                   $scope.icon = $scope.place.icon;
                   $scope.img = $scope.place.photos;
                   if($scope.place.types != undefined)
                   $scope.type = $scope.place.types[0];
                   $scope.place_id = $scope.place.place_id;
                   if($scope.place.opening_hours != undefined)
                   $scope.place_open = $scope.place.opening_hours.open_now;
                   console.log($scope.place);
                   console.log($scope.place.geometry.location.lat());
                   console.log($scope.place.geometry.location.lng());
                   if($scope.place.geometry.viewport != null)
                    console.log($scope.place.geometry.viewport);
                   //Translate Type
                   
                   
                     $scope.openWindow = function() {
        $window.open($scope.place.website, '_system', 'location=yes');
    }   
                   
                   
                   
                   
                   
                    switch($scope.type) {
                        
                        case "street_address": $scope.type = "Straße"
                                                break;
                        
                        case "country": $scope.type = "Land"
                                               break;
                        
                        case "point_of_interest": $scope.type= "Sehenswürdigkeit"
                                                break;
                        
                        case "accounting":   $scope.type = "Verwaltung"
                                                break;
                        case "airport":   $scope.type = "Flughafen"
                                                break;
                         case "amusement_park":   $scope.type = "Vergnügungspark"
                                                break;                                                                                               
                         case "aquarium":   $scope.type = "Aquarienhaus"
                                                break;                       
                         case "art_gallery":   $scope.type = "Kunstgallerie"
                                                break;                       
                         case "atm":   $scope.type = "Bankautomat"
                                                break;                       
                        case "bakery":   $scope.type = "Bäckerei"
                                                break;          
                         case "bank":   $scope.type = "Bank"
                                                break;                                               
                          case "bar":   $scope.type = "Bar"
                                                break;
                          case "beauty_salon":   $scope.type = "Schönheitssalon"
                                                break;
                           case "bicycle_store":   $scope.type = "Fahrradgeschäft"
                                                break;
                           case "book_store":   $scope.type = "Buchhandlung"
                                                break;
                          case "bowling_alley":   $scope.type = "Kegelbahn"
                                                break;
                           case "bus_station":   $scope.type = "Bushaltestation"
                                                break;
                           case "cafe":   $scope.type = "Café"
                                                break;
                           case "campground":   $scope.type = "Campingplatz"
                                                break;
                           case "car_dealer":   $scope.type = "Autohändler"
                                                break;
                           case "car_rental":   $scope.type = "Autoverleih"
                                                break;
                           case "car_repair":   $scope.type = "Autowerkstatt"
                                                break;
                           case "car_wash":   $scope.type = "Autowäsche"
                                                break;
                           case "casino":   $scope.type = "Kasino"
                                                break;
                                                                                                                                                                                                                                                                                                                                        case "cemetery":   $scope.type = "Friedhof"
                                                break;
                            case "church":   $scope.type = "Kirche"
                                                break;
                            case "city_hall":   $scope.type = "Rathaus"
                                                break;
                            case "clothing_store":   $scope.type = "Kleidungsgeschäft"
                                                break;
                            case "convenience_store":   $scope.type = "Geschmistwarenladen"
                                                break;
                           case "courthouse":   $scope.type = "Gerichtsgebäude"
                                                break;
                            case "dentist":   $scope.type = "Zahnarzt"
                                                break;
                            case "department_store":   $scope.type = "Kaufhaus"
                                                break;
                           case "doctor":   $scope.type = "Arzt"
                                                break;
                            case "electrician":   $scope.type = "Elektriker"
                                                break;
                           case "electronics_store":   $scope.type = "Elektronikladen"
                                                break;
                            case "embassy":   $scope.type = "Botschaft"
                                                break;
                            case "establishment":   $scope.type = "Geschäft"
                                                break;
                            case "finance":   $scope.type = "Finanzen"
                                                break;
                            case "fire_station":   $scope.type = "Feuerwehrstation"
                                                break;
                            case "florist":   $scope.type = "Blumenladen"
                                                break;
                            case "food":   $scope.type = "Lebensmittel"
                                                break;
                            case "funeral_home":   $scope.type = "Beerdigungsinstitut"
                                                break;
                            case "furniture_store":   $scope.type = "Möbelgeschäft"
                                                break;
                            case "gas_station":   $scope.type = "Tankstelle"
                                                break;
                             case "general_contractor":   $scope.type = "Generalunternehmer"
                                                break;
                            case "grocery_or_supermarket":   $scope.type = "Supermarkt"
                                                break;
                            case "gym":   $scope.type = "Fitnessstudio"
                                                break;
                            case "hair_care":   $scope.type = "Haarpflege"
                                                break;
                            case "hardware_store":   $scope.type = "Baumarkt"
                                                break;
                            case "health":   $scope.type = "Gesundheit"
                                                break;
                            case "hindu_temple":   $scope.type = "Hindutempel"
                                                break;
                            case "home_goods_store":   $scope.type = "Hauswarengeschäft"
                                                break;
                            case "hospital":   $scope.type = "Krankenhaus"
                                                break;
                            case "insurance_agency":   $scope.type = "Versicherungsunternehmen"
                                                break;
                            case "jewelry_store":   $scope.type = "Juwelier"
                                                break;
                             case "laundry":   $scope.type = "Waschsalon"
                                                break;
                             case "lawyer":   $scope.type = "Anwaltskanzlei"
                                                break;
                            case "library":   $scope.type = "Bibliothek"
                                                break;
                             case "liquor_store":   $scope.type = "Spirituosengeschäft"
                                                break;
                            case "local_government_office":   $scope.type = "Örtliche Polizei"
                                                break;
                             case "locksmith":   $scope.type = "Schlüsseldienst"
                                                break;
                             case "lodging":   $scope.type = "Unterkunft"
                                                break;
                            case "meal_delivery":   $scope.type = "Lieferdienst"
                                                break;
                             case "meal_takeaway":   $scope.type = "Abholrestaurant"
                                                break;
                                                                                                                                                                                                                                                                                                                                        case "movie_rental":   $scope.type = "Videothek"
                                                break;
                            case "movie_theater":   $scope.type = "Kino"
                                                break;
                             case "moving_company":   $scope.type = "Umzugsfirma"
                                                break;
                            case "museum":   $scope.type = "Museum"
                                                break;
                             case "night_club":   $scope.type = "Discothek"
                                                break;
                             case "painter":   $scope.type = "Maler"
                                                break;
                            case "park":   $scope.type = "Park"
                                                break;
                            case "parking":   $scope.type = "Parkplatz"
                                                break;
                             case "pet_store":   $scope.type = "Tierhandlung"
                                                break;
                            case "pharmacy":   $scope.type = "Apotheke"
                                                break;
                                                                                                                                                                                                                                                                                                                                         case "physiotherapist":   $scope.type = "Physiotherapeut"
                                                break;
                                                                                                                                                                                                                                                                                                                                         case "place_of_worship":   $scope.type = "Andachtsstätte"
                                                break;
                            case "plumber":   $scope.type = "Klempner"
                                                break;
                            case "police":   $scope.type = "Polizei"
                                                break;
                             case "post_office":   $scope.type = "Poststelle"
                                                break;
                             case "real_estate_agency":   $scope.type = "Immobilienbüro"
                                                break;
                            case "restaurant":   $scope.type = "Restaurant"
                                                break;
                            case "roofing_contractor":   $scope.type = "Dachdecker"
                                                break;
                            case "rv_park":   $scope.type = "Reisemobil-Stellplatz"
                                                break;
                            case "school":   $scope.type = "Schule"
                                                break;
                            case "shoe_store":   $scope.type = "Schuhgeschäft"
                                                break;
                            case "shopping_mall":   $scope.type = "Einkaufszentrum"
                                                break;
                            case "spa":   $scope.type = "Spa"
                                                break;
                            case "stadium":   $scope.type = "Stadium"
                                                break;
                            case "storage":   $scope.type = "Lager"
                                                break;
                             case "store":   $scope.type = "Geschäft"
                                                break;
                             case "subway_station":   $scope.type = "U-Bahn-Station"
                                                break;
                            case "synagogue":   $scope.type = "Synagoge"
                                                break;
                            case "taxi_stand":   $scope.type = "Taxistand"
                                                break;
                            case "train_station":   $scope.type = "Bahnstation"
                                                break;
                             case "travel_agency":   $scope.type = "Reiseagentur"
                                                break;
                            case "university":   $scope.type = "Universität"
                                                break;
                             case "veterinary_care":   $scope.type = "Tierarzt"
                                                break;
                            case "zoo":   $scope.type = "Zoo"
                                                break;
                            case "route":   $scope.type = "Straße"
                                                break;   
                             case "locality":   $scope.type = "Ort"
                                                break;                                                                                               
                    }                                                                                                                                                                                                                                                                                                                                                                                                  
//-------------------------------------Translate END--------------------------------------------------------------------------
                   
                   
             // User Suchverlauf --------------------------
                if(ref.getAuth() !== null && $rootScope.currentUserSignedIn){
                $scope.user_uid = ref.getAuth().uid;
                var searchRef = ref.child('users').child($scope.user_uid).child('search_history').child($scope.place_id);
                
                var countChildrenRef =  new Firebase("https://vote-x.firebaseio.com/users/"+$scope.user_uid+"/search_history");
          
                searchID(countChildrenRef,searchRef, $scope.place_id, $scope.dynamicName, $scope.type,$scope.place.formatted_address, $scope.icon);

                }
 
                 var placeRef = new Firebase("https://vote-x.firebaseio.com/places/"+$scope.place_id);
                 var place_votes = new Firebase("https://vote-x.firebaseio.com/places/"+$scope.place_id+"/votes");
                 place_votes.once("value",function(snapshot){

                    
                    if(snapshot.numChildren() != null || snapshot.numChildren() != undefined){
                    $scope.totalRatings = snapshot.numChildren();
                    console.log($scope.totalRatings);
                    }
                 });



                    
                 
                   if($scope.place.photos != undefined){
                     $scope.isGoogle = "true";
                     $scope.testImage = $scope.place.photos[0].getUrl({'maxWidth':750, 'maxHeight':500});
                    }
                    
                    else {
                        $scope.testImage = 'img/noimage.jpg';
                    }
                    
                    
                   $ionicScrollDelegate.scrollTop(); 
                   $scope.input = "";
                   $ionicLoading.hide();

            },0);


                }   
                
             else {
                 searchNull();
             }
             
}

    // -------------------- Suche Index erzeugen ---------------------
    
    var searchID = function(data, searchRef, place_id, place_name1, type,address, icon) {
        data.once("value", function(snapshot){
           var a = snapshot.numChildren();
       
      if(place_id == undefined)
      place_id = null;
      
      if(place_name1 == undefined)
      place_name1 = null;
      
      if(type == undefined)
      type = null;
      
      if(address == undefined)
      address = null;

      if(icon == undefined)
      icon = null;
                       
      var searchArray = $firebaseArray(data);
      
      searchArray.$add({
            place_uid: a,
            place_id: place_id,
            place_name: place_name1,
            place_type: type,
            place_address: address,
            place_icon: icon
      }) ;   

      
        });
    }
    // -----------------------------------------------------------------



 var searchNull = function() {
  $ionicPopup.alert({
     title: 'Wählen Sie einen Vorschlag aus!'
   });
 };

$scope.closeSearch = function() {
     $scope.place = null;
     
 }

// Search END ------------------------

//------------------- Local storage PlaceID ----------------------







//------------------------------------------


  $scope.rate = 4;


    // GeoLocation

 $scope.businessName = "Marc's Restaurant";
$scope.businessName2 = "Harun's Bar";
   
   

  
    //ion-refresher----------------------------------------------------------
    

    $scope.doRefresh = function () {


        $timeout(function () {

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 1000);
    };
//------------------------------Business Modal---------------------------------

 $scope.openBusiness = function() {
     if($scope.currentUserSignedIn == false) {
        $ionicPopup.alert({
            title: 'Oh nein!',
            template: 'Du musst dich einloggen, um das sehen zu können!'
        });
         return;
        }
        else {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Wird geladen..',
      hideOnStateChange: true
    });
  };

   $state.go('app.business')
  
    }
  };



//-----------------------------------------END APPCTRL-----------------------------------------

})

votex.filter('iif', function(){
    
    return function(input, trueValue, falseValue){
        return input ? trueValue : falseValue;
    };
    
})



;