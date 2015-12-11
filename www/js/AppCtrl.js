 angular
 
  .module('starter.controllers', [ 'ui.bootstrap','ionicLazyLoad','google.places',
                                   'ngMap','firebase'])

  .controller('AppCtrl', function ($scope, $http,$ionicPlatform,
                                   $state, $ionicModal, $timeout, 
                                   $ionicPopup, $cordovaOauth, 
                                   $ionicLoading, $ionicScrollDelegate, $firebaseArray
                                    )    {

 var ref = new Firebase("https://vote-x.firebaseio.com/");

//----------------------------- Search ------------------------------------
   
 $scope.se = function() {
             
                if($scope.input != null &&$scope.input.place_id != undefined) {  
     
     
     $scope.isGoogle = "false"; //ng-if Info
     
                   $ionicLoading.show({
                     
      noBackdrop: true,
      template: '<p class="item-icon-left">Wird geladen...<ion-spinner icon="lines"/></p>'
    });
                
                
                $scope.place = $scope.input;
        
            $scope.icon = $scope.place.icon;
        
            $timeout(function(){
                
                   $scope.dynamicName = $scope.place.name; 
                   
                   $scope.icon = $scope.place.icon;
                   $scope.img = $scope.place.photos;
                   $scope.type = $scope.place.types[0];
                   $scope.place_id = $scope.place.place_id;
                   
                   //Translate Type
                   
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
                if(ref.getAuth() !== null ){
                $scope.user_uid = ref.getAuth().uid;
                var searchRef = ref.child('users').child($scope.user_uid).child('search_history').child($scope.place_id);

                 
                 searchRef.update({
                     place_name: $scope.place.name,
                     place_type: $scope.type,
                     place_address: $scope.place.formatted_address
                 });  
                }
 
                 
                   
                   // Zeige 0 votes, wenn user_ratings_total = null
                   if($scope.place.user_ratings_total >= 0){
                        $scope.totalRatings = $scope.place.user_ratings_total;
                        }
                    else {
                        $scope.totalRatings = 0;
                    }    
                    
                 
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
   
   
    //------------- Google Search Box ------------------
    $scope.filter = [
        // ['establishment'] etc für input in home.html
    ]
    
    //------------Get profile Url---------------- 
    /*
        $scope.getProfilePic = function(authData) {
              $scope.userID = authData.uid;
              
              var fbStr = "https://vote-x.firebaseio.com/users/"+$scope.userID;
              var testRef = new Firebase (fbStr);
              console.log(testRef);
            if($rootScope.currentUserSignedIn) {
                console.log("scope.userID = "+$scope.userID);
              
                userRef.child($scope.userID);
                userDetailRef.update({
                   
                   ProfileImage: authData.password.profileImageURL
                    
                });
                
                console.log("ProfileImg updated"); 
            }
           
            
        };
   */
  

  
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
      template: 'Loading...'
    });
  };
   $state.go('app.business')
  
    }
  };
  
  //Business Name 2
 $scope.openBusiness2 = function() {
     if($scope.currentUserSignedIn == false) {
        $ionicPopup.alert({
            title: 'Oh nein!',
            template: 'Du musst dich einloggen, um das sehen zu können!'
        });
         return;
        }
        else {
   $state.go('app.business2') }
  };


//-----------------------------------------END APPCTRL-----------------------------------------

})

.filter('iif', function(){
    
    return function(input, trueValue, falseValue){
        return input ? trueValue : falseValue;
    };
    
})



;