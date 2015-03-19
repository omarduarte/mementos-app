(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Alerts', Alerts);
  
  /* @ngInject */ 
  function Alerts($ionicPopup) {

    var service = {
      showIncorrectPassword: showIncorrectPassword,
      showUserDoesNotExist: showUserDoesNotExist,
      showUserExists: showUserExists,
      errorSavingMoment: errorSavingMoment,
      errorSavingMemento: errorSavingMemento
    };

    return service;
   
   function showIncorrectPassword() {
     var alertPopup = $ionicPopup.alert({
       title: 'Incorrect Password',
       template: 'The password you entered is incorrect. Please try again'
     });
   };

   function showUserDoesNotExist() {
     var alertPopup = $ionicPopup.alert({
       title: 'User Does Not Exist',
       template: 'The email you entered does not exist. Please try again'
     });
   };

   function showUserExists() {
     var alertPopup = $ionicPopup.alert({
       title: 'User Already Exists',
       template: 'The email you entered already exists. Please try again'
     });
   };

   function errorSavingMoment() {
     var alertPopup = $ionicPopup.alert({
       title: 'Error Saving Moment',
       template: 'Whoops, there was an error saving your moment! Please try again'
     });
   };

   function errorSavingMemento() {
     var alertPopup = $ionicPopup.alert({
       title: 'Error Saving Memento',
       template: 'Whoops, there was an error saving your memento! Please try again'
     });
   };

  }

})();

