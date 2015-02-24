(function() {
  'use strict';

  angular
    .module('app.media')
    .factory('Camera', Camera);

  /* @ngInject */
  function Camera($q) {
    
    var service = {
      takePhoto: takePhoto,
      cleanup: cleanup
    };

    return service;

    function takePhoto() {
      var q = $q.defer();
      var camera = navigator.camera;
      var cameraOptions = {
        destinationType : camera.DestinationType.DATA_URL,
        sourceType : camera.PictureSourceType.CAMERA,
        encodingType: camera.EncodingType.JPEG,
        allowEdit : true,
        quality: 40,
        targetWidth: 640,
        targetHeight: 640,
        saveToPhotoAlbum: false
      };

      camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, cameraOptions);

      return q.promise;
    }
    
    function cleanup() {
      var q = $q.defer();
      navigator.camera.cleanup(function() {
        q.resolve();
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    }
  }


})();