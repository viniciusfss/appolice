angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $state, $http /*$ionicModal*/) {
  // Form data for the login modal
  if ((window.localStorage.token === null) ||
      (window.localStorage.token === undefined) ||
      (window.localStorage.token === "")) {
        console.log("No Token found!");
        return $state.go('login');
  } else {
    console.log("Token found!");
    $http.defaults.headers.common['X-Token'] = window.localStorage.authToken;
    return $state.go('app.dashboard');
  }

  /* $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }; */
})

.controller('LoginCtrl', function($scope, $ionicPlatform, $ionicPopup, $state, $timeout, AuthFactory) {
  $scope.login = '';
  $scope.password = '';
  $scope.platformTypeAndVersion = ionic.Platform.platform() +
                                  " v" + ionic.Platform.version();
  $scope.disableBtn = true;
  $scope.info = Math.floor((Math.random() * 1000000000000) + 1);

  $scope.removeNonNumbers = function() {
    $scope.login = $scope.login.replace(/\D+/g, '');
  };

  $scope.checkIfPassNotEmpty = function () {
    if ($scope.password !== '') {
      $scope.disableBtn = false;
    } else {
      $scope.disableBtn = true;
    }
  };

  $scope.doLogin = function() {
    $scope.login = AuthFactory.getUserId();
    AuthFactory.login($scope.login, $scope.password, function (error, result) {
      if (error || error === 0) {
        var myPopup;
        if (error === 404) {
          myPopup = $ionicPopup.show({
            title: 'Seus dados não puderam ser verificados.',
            subTitle: 'Por favor, verifique se os seus dados estão corretos e tente novamente.',
            scope: $scope,
            buttons: [
              {
                text: '<b>Fechar</b>',
                type: 'button-error'
              }
            ]
          });
          $timeout(function () {
            myPopup.close(); // close the popup after 4 seconds.
          }, 4000);
        } else if (error === 500 || error === 0) {
          myPopup = $ionicPopup.show({
            title: 'Ooops! Ocorreu um problema! :(',
            subTitle: 'Por favor, tente novamente. Se o problema persistir, tente mais tarde.',
            scope: $scope,
            buttons: [
              {
                text: '<b>Fechar</b>',
                type: 'button-error'
              }
            ]
          });
          $timeout(function() {
            myPopup.close(); // close the popup after 4 seconds.
          }, 4000);
        } else {
          // TODO: Redirect to the password page.
          $state.go('login');
        }
      } else {
        console.log(result);
        $state.go('app.dashboard');
      }
    });
  };

  $scope.askForTokenAndGoNextPage = function() {
    /*
     * This function asks for a Token on the AuthFactory. If AuthFactory returns
     * a token, it will foward the user to the next step. If it returns an error,
     * it will trigger a "User Not Found error".
     */
     var user = {
       username: $scope.login,
       client: $scope.platformTypeAndVersion,
       info: $scope.info
     };
     AuthFactory.requestFirstUseToken(user, function(error, result) {
       if (error || error === 0) { // error === 0 is in case service is offline.
         var myPopup;
         if (error === 404) {
           myPopup = $ionicPopup.show({
             title: 'Seus dados não puderam ser verificados.',
             subTitle: 'Por favor, verifique se os seus dados estão corretos e tente novamente.',
             scope: $scope,
             buttons: [
               {
                 text: '<b>Fechar</b>',
                 type: 'button-error'
               }
             ]
           });
           $timeout(function () {
             myPopup.close(); // close the popup after 4 seconds.
           }, 4000);
         } else if (error === 500 || error === 0) {
           myPopup = $ionicPopup.show({
             title: 'Ooops! Ocorreu um problema! :(',
             subTitle: 'Por favor, tente novamente. Se o problema persistir, tente mais tarde.',
             scope: $scope,
             buttons: [
               {
                 text: '<b>Fechar</b>',
                 type: 'button-error'
               }
             ]
           });
           $timeout(function() {
             myPopup.close(); // close the popup after 4 seconds.
           }, 4000);
         } else {
           $state.go('loginPasswordPage');
         }
       } else {
         var tempToken = result;
         $state.go('loginFirstTimePass');
       }
     });
  }
})

.controller('LoginFTPCtrl', function ($scope, AuthFactory) {
  $scope.pass1 = '';
  $scope.pass2 = '';
  $scope.disableBtn = true;

  $scope.checkIfPassMatches = function () {
    if (($scope.pass1 === $scope.pass2) && $scope.pass1 !== '') {
      $scope.disableBtn = false;
    } else {
      $scope.disableBtn = true;
    }
  };

  $scope.createNewPass = function() {
    var userId = AuthFactory.getUserId();
    var password = $scope.pass1;
    var tempToken = AuthFactory.getTempToken();
    AuthFactory.createNewPass(userId, password, tempToken, function(error, result) {
      if (error) {
        console.log(error);
        myPopup = $ionicPopup.show({
          title: 'Ooops! Ocorreu um problema! :(',
          subTitle: 'Por favor, tente novamente. Se o problema persistir, tente mais tarde.',
          scope: $scope,
          buttons: [
            {
              text: '<b>Fechar</b>',
              type: 'button-error'
            }
          ]
        });
        $timeout(function() {
          myPopup.close(); // close the popup after 4 seconds.
        }, 4000);
      } else {
        console.log(result);
        $state.go('app.dashboard')
      }

    });
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PathCtrol', function($scope, $location) {
  $scope.moveToDetalhes = function() {
    $location.path('/app/detalhes');
  };
  $scope.moveTorenovacaoDetail = function() {
    $location.path('/app/renovacaoDetail');
  };
  // $scope.dialNumber = function(number) {
  //   window.open('tel:' + number, '_system');
  // }
})

.controller('SinsCtrl', function($scope, Sins) {
  $scope.sins = Sins.all();
  $scope.remove = function(sin) {
    Sins.remove(sin);
  };
})


;
