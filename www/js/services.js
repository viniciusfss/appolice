angular.module('starter.services', ['constants'])
.factory('AuthFactory', function($q, $http, APP_CONSTANTS) {
  var self = this;
  this.tempToken = '';
  this.userId = '';

  return {
    login: function(userId, password, cb) {
      /*
       * This will save the token into the localStorage and set the X-Token header.
       * Also, it checks if the user is a client or a broker. Broker access is not
       * allowed.
       */
      var user = {id: userId, password: password};
      var apiPath = APP_CONSTANTS.appoliceUrl + 'account/login';
      $http({
        method: 'PUT',
        url: apiPath,
        data: user
      })
        .then(function successCallback(response) {
          console.log(response.data);
          localStorage.token = response.data.token;
          $http.defaults.headers.common['X-Auth-Token'] = response.data.token;
          cb(undefined, response.data);
        }, function error(response) {
          cb(response.status);
        })

    },

    requestFirstUseToken: function(user, cb) {
      /*
       * This function will ask the backend for a token, so the user can generate
       * a new password for herself. If the user already has a password, it will
       * return error: "Already has password". If an user was not found, it'll
       * return a error: "Not found."
       */
      self.userId = user.username;
      var apiPath = APP_CONSTANTS.appoliceUrl + 'client/passwordToken';
      $http({
        method: 'PUT',
        url: apiPath,
        data: user
      })
      .then(function successCallback(response) {
        self.tempToken = response.data.token;
        cb(undefined, response.data);
      }, function error(response) {
        cb(response.status);
      })
    },

    createNewPass: function(username, password, token, cb) {
      // This will be used when the user tries to login for the first time.
      var user = {username: username, password: password, tempToken: token};

      console.log(user);
      var apiPath = APP_CONSTANTS.appoliceUrl + 'client/savePass';
      $http({
        method: 'PUT',
        url: apiPath,
        data: user
      }).then(
        function successCallback(response) {
          cb(undefined, response.data);
        },
        function errorCallback(response) {
          cb(response.status);
        }
      )
    },

    getTempToken: function() { return self.tempToken; },
    getUserId: function() { return self.userId }
  }
})


.service('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Lucas Rico',
    lastText: 'Seu seguro residencial está para vencer. Você já pensou se vai renovar? ',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    read: 'new',
    time: '1:08PM'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Pellentesque non tincidunt libero. Pellentesque non sapien nulla. Fusce mollis lectus quis finibus vehicula. ',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
    read: 'new',
    time: '1:08PM'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in sapien dictum.',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
    read: '',
    time: '22 de abril'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Vinicius.O tamanho do documento importa mai...',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
    read: '',
    time: 'ontem'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
    read: '',
    time: 'ontem'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('Sins', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var sins = [{
    id: 0,
    name: 'DMX-2988',
    title: 'Seu seguro residencial está para vencer. Você já pensou se vai renovar? ',
    location: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    read: 'new',
    time: '1:08PM'
  }, {
    id: 1,
    name: 'DMX-2988',
    title: 'Seu seguro residencial está para vencer. Você já pensou se vai renovar? ',
    location: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    read: 'new',
    time: '1:08PM'
  }, {
    id: 2,
    name: 'DMX-2988',
    title: 'Seu seguro residencial está para vencer. Você já pensou se vai renovar? ',
    location: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    read: '',
    time: '1:08PM'
  }, {
    id: 3,
    name: 'DMX-2988',
    title: 'Seu seguro residencial está para vencer. Você já pensou se vai renovar? ',
    location: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    read: '',
    time: '1:08PM'
  }];

  return {
    all: function() {
      return sins;
    },
    remove: function(sin) {
      sins.splice(sins.indexOf(sin), 1);
    },
    get: function(sinId) {
      for (var i = 0; i < sins.length; i++) {
        if (sins[i].id === parseInt(sinId)) {
          return sins[i];
        }
      }
      return null;
    }
  };
})


;
