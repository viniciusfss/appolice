angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

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
  };
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
