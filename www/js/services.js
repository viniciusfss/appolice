angular.module('starter.services', [])
.service('AuthService', function($q, $http, APP_CONSTANTS) {

  var login = function (username, password) {
    /*
     * This will save the token into the localStorage and set the X-Token header.
     * Also, it checks if the user is a client or a broker. Broker access is not
     * allowed.
     */
  }

  var firstUseGeneratePassword = function (password, token) {
    // This will be used when the user tries to login for the first time.
  }

  return {
    login: login,
    firstUseGeneratePassword: firstUseGeneratePassword,
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
