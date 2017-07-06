angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout,$rootScope) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.showDropDownMenu = function(){
      if($rootScope.showDropDown == false){
        $rootScope.showDropDown = true;
      }else{
      $rootScope.showDropDown = false;
    }
    }
  })
  .controller('LoginCtrl', function ($scope, $stateParams, $state, $ionicPopup) {
    $scope.data = {};
    $scope.goToAdventure = function () {
      $state.go('app.adventures');
    }

    $scope.goToRegister = function () {
      $state.go('register');
    }

    $scope.login = function (email,password) {

      var email = $scope.data.username
      var password = $scope.data.password
      var errorMessage = ""
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        errorMessage = error.message;
        // ...
      })
        .then(function(){
          if (errorMessage) {
          }else{
            $scope.goToAdventure()
          }
        });
    }

  })

  // .controller('LoginCtrl', function ($scope, $stateParams, $state, $ionicPopup,ionicToast) {
  //   $scope.email = "zaffalonvictor@gmail.com"
  //   $scope.password = "123456"
  //
  //   $scope.goToAdventure = function () {
  //     $state.go('app.adventures');
  //   }
  //
  //   $scope.goToRegister = function () {
  //     $state.go('register');
  //   }
  //
  //   $scope.login = function (email,password) {
  //     var email = $scope.email
  //     var password = $scope.password
  //     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       ionicToast.show(errorMessage, 'bottom', false, 2500);
  //       // ...
  //   })
  //   .then(function(){
  //     var user = firebase.auth().currentUser;
  //
  //     if (user) {
  //     $scope.goToAdventure()
  //     }
  //   });
  //   }
  //
  // })
  .controller('RegisterCtrl', function ($scope, $stateParams, $state, $ionicPopup) {
    $scope.data = {};

    $scope.goToAdventure = function () {
      $state.go('app.adventures');
    }
    $scope.goToLogin = function () {
      $state.go('login');
    }

    $scope.register = function () {
      var email = $scope.data.email
      var password = $scope.data.password
      var gender = $scope.data.gender
      var birthdate = $scope.data.birthdate
      var nickname = $scope.data.nickname

      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })
        .then(function(){
          var user = firebase.auth().currentUser;
          var userToken = user.uid

          if (user) {
            writeUserData(userToken,nickname,birthdate,gender,email)
          } else {
            // No user is signed in.
          }
        });
    }

    function writeUserData(user_id, nickname, birthdate, gender,email) {
      firebase.database().ref('users/' + user_id).set({
        user_id: user_id,
        nickname: nickname,
        birthdate: birthdate,
        gender: gender,
        email: email
      })
      $scope.goToLogin()
    }

  })

  // .controller('RegisterCtrl', function ($scope, $stateParams, $state, $ionicPopup,ionicToast) {
  //   $scope.email = "zaffalonvictor@gmail.com"
  //   $scope.password = "123456"
  //   $scope.gender = "Masculino"
  //   $scope.birthdate = "23/06/1996"
  //   $scope.nickname = "Murilinho"
  //
  //   $scope.goToAdventure = function () {
  //     $state.go('app.adventures');
  //   }
  //
  //   $scope.register = function () {
  //     var email = $scope.email
  //     var password = $scope.password
  //     var gender = $scope.gender
  //     var birthdate = $scope.birthdate
  //     var nickname = $scope.nickname
  //
  //     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       ionicToast.show(errorMessage, 'bottom', false, 2500);
  //       // ...
  //     })
  //     .then(function(){
  //       var user = firebase.auth().currentUser;
  //       var userToken = user.uid
  //
  //       if (user) {
  //         writeUserData(userToken,nickname,birthdate,gender,email)
  //       } else {
  //         // No user is signed in.
  //       }
  //     });
  //   }
  //
  //   function writeUserData(user_id, nickname, birthdate, gender,email) {
  //     firebase.database().ref('users/' + user_id).set({
  //       user_id: user_id,
  //       nickname: nickname,
  //       birthdate: birthdate,
  //       gender: gender,
  //       email: email
  //     })
  //     $scope.goToAdventure()
  //   }
  //
  // })

  .controller('AdventuresCtrl', function ($scope, $stateParams, $state, $ionicPopup,$rootScope) {
    $rootScope.showDropDown = false;
    var id= 1;
    $scope.adventures = [];

    var commentsRef = firebase.database().ref('adventures/');
    commentsRef.on('child_added', function(data) {
      var value = data.val()
      // initialize array
      id += 1
      if(id == 6){
        id = 1
      }
      var adv = {
      title: value.adventure_name, data: "24/10", progress: 0, background_id: id,
      adventure_master_id: value.adventure_master_id,adventure_id: data.key
    };
      // append new value to the array
      $scope.adventures.push(adv);
      $scope.$apply()
    });

    commentsRef.on('child_changed', function(data) {
    });

    commentsRef.on('child_removed', function(data) {
    });


    $scope.goToAdventureInfo = function (index) {
      $rootScope.adventure_id = $scope.adventures[index].adventure_id
      $rootScope.background_id = $scope.adventures[index].background_id
      $state.go('app.adventureinfo');
    }

    $scope.goToAddAdventure = function () {
      $state.go('app.add_adventure');
    }

  })

  .controller('AdventureInfoCtrl', function ($scope, $stateParams, $ionicPopup, $state,$rootScope) {
    $rootScope.showDropDown = false;

    $scope.includeHistory = true;
    $scope.includePlayers = false;
    $scope.histories = [];
    $scope.adventure_name = "Nome da aventura"
    $scope.adventure_description = "Descrição da Aventura"
    $scope.background_id = $rootScope.background_id

    var adventure_id = $rootScope.adventure_id
    var ref = firebase.database().ref('adventures/' + adventure_id + '/adventure_name');
    ref.on('value', function(snapshot) {
      $scope.adventure_name = snapshot.val()

});
    var ref2 = firebase.database().ref('adventures/' + adventure_id + '/adventure_description');
    ref2.on('value', function(snapshot) {
      $scope.adventure_description = snapshot.val()
    });

    var adventure_id = $rootScope.adventure_id
    var sectionsRef = firebase.database().ref('adventures/'+adventure_id+'/history_sections');
    sectionsRef.on('child_added', function(data) {
      var value = data.val()
      // initialize array
      var adv = {
      title: value.section_name, data: value.section_date, description: value.section_description, show: false
    };
      // append new value to the array
      $scope.histories.push(adv);
    });

    $scope.addHistory = function () {
      $scope.includeHistory = true;
      $scope.includePlayers = false;
    }
    $scope.addPlayers = function () {
      $scope.includePlayers = true;
      $scope.includeHistory = false;
    }


    $scope.showHideSection = function (index) {
      if ($scope.histories[index].show == false) {
        $scope.histories[index].show = true;
      } else {
        $scope.histories[index].show = false;
      }
    }

    $scope.players = [];

    var adventure_id = $rootScope.adventure_id
    var playersRef = firebase.database().ref('adventures/'+adventure_id+'/players');
    playersRef.on('child_added', function(data) {
      var value = data.val()
      // initialize array
      var adv = {
        name: value.user_nickname, role: value.game_role, description: value.game_role_description
    };
      // append new value to the array
      $scope.players.push(adv);
    });

    $scope.selectedPlayer = 0;
    $scope.selectPlayer = function (index) {
      $scope.selectedPlayer = index;
    }

    $scope.showAdventureInfoPopup = function () {
      if($scope.includePlayers == true){
        $scope.goToAddPlayers();
      }else{
        $scope.goToAddSection();
      }
    }
    $scope.goToAddPlayers = function () {
      $state.go('app.add_players')
    }
    $scope.goToAddSection = function () {
      $state.go('app.add_section');
    }
  })
  .controller('AddAdventureCtrl', function ($scope, $stateParams, $state, $ionicPopup,$rootScope) {
    $scope.data = {};

    $scope.saveAdventure = function () {
      var user = firebase.auth().currentUser;
      var adventure_name = $scope.data.adventure_name
      var adventure_master_id = user.uid
      var adventure_description = $scope.data.adventure_description

      var newRef = firebase.database().ref('adventures/').push({
        adventure_name: adventure_name,
        adventure_master_id: adventure_master_id,
        adventure_description: adventure_description
      }).then((snap) => {
    const key = snap.key
     saveAdventureIdInUser(key)
     $scope.goToAdventure()
    });
    }

    function saveAdventureIdInUser(key){
      var user = firebase.auth().currentUser;

      firebase.database().ref('users/' + user.uid + '/my_adventures/' + key).set({
      adventure_id: key,
    });
  }

    $scope.goToAdventure = function () {
      $state.go('app.adventures');
    }

  })


  .controller('AddSectionCtrl', function ($scope, $stateParams, $state, $ionicPopup,$rootScope) {
    $scope.data = {};

    $scope.goToAdventureInfo = function () {
      $state.go('app.adventureinfo');
    }

    $scope.saveSection = function () {
      var section_name = $scope.data.section_name
      var section_description = $scope.data.section_description
      var section_date = $scope.data.section_date
      var adventure_id = $rootScope.adventure_id

      firebase.database().ref('adventures/' + adventure_id + '/history_sections/').push({
        section_name: section_name,
        section_description: section_description,
        section_date: section_date
      });
      $scope.goToAdventureInfo()
    }
  })
  .controller('AddPlayersCtrl', function ($scope, $stateParams, $state, $ionicPopup,$rootScope) {
      $scope.data = {};

      $scope.savePlayer = function () {
        var game_role = $scope.data.game_role
        var user_nickname = $scope.data.user_nickname
        var game_role_description = $scope.data.game_role_description

        var adventure_id = $rootScope.adventure_id
        firebase.database().ref('adventures/' + adventure_id + '/players/' + user_nickname).set({
          user_nickname: user_nickname,
          game_role: game_role,
          game_role_description: game_role_description
        });
        $scope.goToAdventureInfo()
      }

      $scope.goToAdventureInfo = function () {
        $state.go('app.adventureinfo');
      }
  }
);
