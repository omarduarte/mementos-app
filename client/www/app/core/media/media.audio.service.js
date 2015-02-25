(function() {
  'use strict';

  angular
    .module('app.media')
    .factory('Audio', Audio);

  /* @ngInject */
  function Audio($q, $cordovaMedia) {
    
    // DOCs
    // http://ngcordova.com/docs/plugins/media/
    var service = {
      startRecording: startRecording,
      stopRecording: stopRecording,
      play: play,
      pause: pause,
      stop: stop,
      getFilePath: getFilePath,
      encodeToM4A: encodeToM4A
    };

    return service;

    function startRecording() {
      var q = $q.defer();
      
      getMediaObject()
      .then(function(recording, filename) {
        recording.startRecord();        
        q.resolve(recording, filename);        
      })
      .catch(function(err) {
        q.reject(err);        
      });
          
      return q.promise;
    }

    function stopRecording(recording) {
      recording.stopRecord();      
    }

    function play(filename) {
      var q = $q.defer();   

      if(!filename) {
        return $q.reject('Audio Service Error: No filename selected for playback.');        
      }

      getMediaObject(filename)
      .then(function(playback, filename) {
        playback.startRecord();        
        q.resolve(playback, filename);        
      })
      .catch(function(err) {
        q.reject(err);        
      });

      return q.promise;
    }

    function pause(playback) {
      playback.pause();
    }

    function stop(playback) {
      playback.stop();
    }

    function getMediaObject(filename) {
      var q = $q.defer();

      // Create a new Filename if there is none selected
      // i.e. filename playback's will provide the filaname
      // P.S: iOS only handles .wav files
      if (!filename) {
        filename = $filter('date')(new Date(), 'yyyy_MM_dd-HH_mm_ss.sss') + '.wav';    
      }
      
      var recording = $cordovaMedia.newMedia(filename).then(success, failure);

      function success() {
        q.resolve(recording, filename);        
      }
      function failure(err) {
        q.reject(err);        
      }

      return q.promise;
    }

    // TODO
    function encodeToM4A() {

    }

    function getFilePath(filename) {
      return 'documents://' + filename;
    }
  }

})();
