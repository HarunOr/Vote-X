angular.module('starter.bookmarkCtrl', ['firebase','google.places'])

.controller('bookmarkCtrl', function ($scope, $rootScope, $firebaseArray, $state, $timeout) {


if($rootScope.currentUserSignedIn){

    $scope.book = {exists: false};

    $scope.getBookmarks = function () {


    $rootScope.bookPlace = [];
    $scope.bookCounter = 0;
    var userBookmarkRef = new Firebase("https://vote-x.firebaseio.com/users/"+$rootScope.user.uid+"/bookmarks");

    userBookmarkRef.once("value", function (bookChild) {


      bookChild.forEach(function (bookData) {


        var map = new google.maps.Map({});
        var request = {
          placeId: bookData.key()
        };

        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);


        // get placeobject from google‚
        function callback(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {

              $scope.$apply(function() {
                $scope.book.exists = true;
                $rootScope.bookPlace[$scope.bookCounter] = {
                  id: $scope.bookCounter,
                  pID: bookData.key(),
                  name: place.name,
                  icon: place.icon,
                  tel: place.formatted_phone_number,
                  web: place.website,
                  butCol: randomColor({ luminosity: 'random',hue: 'random'}),
                  placeObject: place,
                  dist: calcDist(place.geometry.location.lat(),place.geometry.location.lng())
                };

                $scope.getVoteInfo(bookData.key(),$scope.bookCounter);

                // Richtigen String
                switch ($rootScope.bookPlace[$scope.bookCounter].placeObject.types[0]) {

                  case "street_address":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Straße";
                    break;

                  case "country":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Land";
                    break;

                  case "point_of_interest":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Sehenswürdigkeit";
                    break;

                  case "accounting":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Verwaltung";
                    break;
                  case "airport":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Flughafen";
                    break;
                  case "amusement_park":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Vergnügungspark";
                    break;
                  case "aquarium":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Aquarienhaus";
                    break;
                  case "art_gallery":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Kunstgallerie";
                    break;
                  case "atm":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Bankautomat";
                    break;
                  case "bakery":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Bäckerei";
                    break;
                  case "bank":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Bank";
                    break;
                  case "bar":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Bar";
                    break;
                  case "beauty_salon":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Schönheitssalon";
                    break;
                  case "bicycle_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Fahrradgeschäft";
                    break;
                  case "book_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Buchhandlung";
                    break;
                  case "bowling_alley":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Kegelbahn";
                    break;
                  case "bus_station":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Bushaltestation";
                    break;
                  case "cafe":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Café";
                    break;
                  case "campground":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Campingplatz";
                    break;
                  case "car_dealer":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Autohändler";
                    break;
                  case "car_rental":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Autoverleih";
                    break;
                  case "car_repair":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Autowerkstatt";
                    break;
                  case "car_wash":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Autowäsche";
                    break;
                  case "casino":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Kasino";
                    break;
                  case "cemetery":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Friedhof";
                    break;
                  case "church":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Kirche";
                    break;
                  case "city_hall":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Rathaus";
                    break;
                  case "clothing_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Kleidungsgeschäft";
                    break;
                  case "convenience_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Geschmistwarenladen";
                    break;
                  case "courthouse":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Gerichtsgebäude";
                    break;
                  case "dentist":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Zahnarzt";
                    break;
                  case "department_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Kaufhaus";
                    break;
                  case "doctor":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Arzt";
                    break;
                  case "electrician":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Elektriker";
                    break;
                  case "electronics_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Elektronikladen";
                    break;
                  case "embassy":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Botschaft";
                    break;
                  case "establishment":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Geschäft";
                    break;
                  case "finance":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Finanzen";
                    break;
                  case "fire_station":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Feuerwehrstation";
                    break;
                  case "florist":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Blumenladen";
                    break;
                  case "food":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Lebensmittel";
                    break;
                  case "funeral_home":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Beerdigungsinstitut";
                    break;
                  case "furniture_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Möbelgeschäft";
                    break;
                  case "gas_station":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Tankstelle";
                    break;
                  case "general_contractor":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Generalunternehmer";
                    break;
                  case "grocery_or_supermarket":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Supermarkt";
                    break;
                  case "gym":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Fitnessstudio";
                    break;
                  case "hair_care":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Haarpflege";
                    break;
                  case "hardware_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Baumarkt";
                    break;
                  case "health":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Gesundheit";
                    break;
                  case "hindu_temple":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Hindutempel";
                    break;
                  case "home_goods_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Hauswarengeschäft";
                    break;
                  case "hospital":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Krankenhaus";
                    break;
                  case "insurance_agency":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Versicherungsunternehmen";
                    break;
                  case "jewelry_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Juwelier";
                    break;
                  case "laundry":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Waschsalon";
                    break;
                  case "lawyer":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Anwaltskanzlei";
                    break;
                  case "library":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Bibliothek";
                    break;
                  case "liquor_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Spirituosengeschäft";
                    break;
                  case "local_government_office":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Örtliche Polizei";
                    break;
                  case "locksmith":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Schlüsseldienst";
                    break;
                  case "lodging":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Unterkunft";
                    break;
                  case "meal_delivery":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Lieferdienst";
                    break;
                  case "meal_takeaway":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Abholrestaurant";
                    break;
                  case "movie_rental":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Videothek";
                    break;
                  case "movie_theater":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Kino";
                    break;
                  case "moving_company":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Umzugsfirma";
                    break;
                  case "museum":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Museum";
                    break;
                  case "night_club":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Discothek";
                    break;
                  case "painter":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Maler";
                    break;
                  case "park":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Park";
                    break;
                  case "parking":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Parkplatz";
                    break;
                  case "pet_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Tierhandlung";
                    break;
                  case "pharmacy":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Apotheke";
                    break;
                  case "physiotherapist":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Physiotherapeut";
                    break;
                  case "place_of_worship":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Andachtsstätte";
                    break;
                  case "plumber":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Klempner";
                    break;
                  case "police":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Polizei";
                    break;
                  case "post_office":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Poststelle";
                    break;
                  case "real_estate_agency":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Immobilienbüro";
                    break;
                  case "restaurant":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Restaurant";
                    break;
                  case "roofing_contractor":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Dachdecker";
                    break;
                  case "rv_park":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Reisemobil-Stellplatz";
                    break;
                  case "school":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Schule";
                    break;
                  case "shoe_store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Schuhgeschäft";
                    break;
                  case "shopping_mall":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Einkaufszentrum";
                    break;
                  case "spa":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Spa";
                    break;
                  case "stadium":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Stadium";
                    break;
                  case "storage":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Lager";
                    break;
                  case "store":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Geschäft";
                    break;
                  case "subway_station":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "U-Bahn-Station";
                    break;
                  case "synagogue":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Synagoge";
                    break;
                  case "taxi_stand":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Taxistand";
                    break;
                  case "train_station":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Bahnstation";
                    break;
                  case "travel_agency":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Reiseagentur";
                    break;
                  case "university":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Universität";
                    break;
                  case "veterinary_care":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Tierarzt";
                    break;
                  case "zoo":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Zoo";
                    break;
                  case "route":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Straße";
                    break;
                  case "locality":
                    $rootScope.bookPlace[$scope.bookCounter].placeObject.types[0] = "Ort";
                    break;
                }
              });

              $scope.bookCounter++;


          }
        }

      });

    });
  };

        var calcDist = function (pLat, pLng) {

          if($rootScope.userGEO && ionic.Platform.isWebView()){
            var dist = (google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng($rootScope.userGEO.lat, $rootScope.userGEO.lng), new google.maps.LatLng(pLat, pLng))/1000);
            return dist.toFixed(2);
         }

          else{
            return " - ";
          }
        };



        //--------------------- Get Vote Info ---------------------
        $scope.getVoteInfo = function (pID,index) {
          var place_votes = new Firebase("https://vote-x.firebaseio.com/places/" + pID);
          place_votes.once("value", function(snapshot) {

            if (snapshot.val() !== null) {


              $scope.$apply(function() {
                  $rootScope.bookPlace[index].ratingNumber = snapshot.val().total_votes;
                  $rootScope.bookPlace[index].rating = snapshot.val().avg_vote_points;
                  if(snapshot.val().total_votes === 1){
                  $rootScope.bookPlace[index].voteString = "Vote";
                  }
                  else{
                  $rootScope.bookPlace[index].voteString = "Votes";
                  }
                });
            } else {
              $rootScope.bookPlace[index].ratingNumber  = 0;
              $rootScope.bookPlace[index].rating = 0;
              $rootScope.bookPlace[index].voteString = "Votes";
            }
          });
        };

        //----------- Vote Info END --------------------

        }
        else{
          $state.go('app.home');
        }

        //----------- Go Business View -----------------

        $scope.showBusiness = function (place, avg, number) {
          console.info("name : "+name);
          $timeout(function () {
            $rootScope.placeObject = place;
            $rootScope.votexObject = {avg_points : avg,
                                     amountRatings : number};

            $state.go('app.business');
          });


        };



        //----------- Refresher ------------------------

        $scope.leggo = function() {
          $scope.getBookmarks();
          $state.reload();
          $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.getBookmarks();

        //----------- Refresher End ---------------------
  });
