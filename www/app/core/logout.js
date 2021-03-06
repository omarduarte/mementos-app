(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('logout', logout);
  
  /* @ngInject */ 
  function logout($ionicActionSheet, $timeout, $state, $ionicHistory, DataHandler) {

    var service = {
      show: show
    };

    return service;
    
    // shows logout action sheet
    function show() {
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Logout',
        titleText: 'Are you sure?',
        cancelText: 'Cancel',
        destructiveButtonClicked: logoutUser
      });
      
      // resets user credentials, clears app history stack, and takes user to home
      function logoutUser() {
        DataHandler.user.reset();
        DataHandler.moment.reset();
        DataHandler.memento.reset();
        DataHandler.mementos.reset();
        $ionicHistory.clearHistory();
        $state.go('home');
      }

      // hides sheet after two seconds
      $timeout(function() {
        hideSheet();
      }, 2000);
    }
  }

})();

