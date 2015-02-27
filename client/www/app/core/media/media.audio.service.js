(function() {
  'use strict';

  angular
    .module('app.media')
    .factory('Audio', Audio);

  /* @ngInject */
  function Audio($q, $cordovaMedia, $filter) {
        
    var service = {
      getMediaObject: getMediaObject,        
      encodeToM4A: encodeToM4A
    };

    return service;

    ////////////////////////////////////////////

    function getMediaObject(filename, onAudioDone) {
      var media;

      // Create a new Filename if there is none selected
      // i.e. filename playback's will provide the filaname
      // P.S1: iOS only handles .wav files
      // P.S2: iOS uses the app's documents:// directory for persistance
      if (!filename) {
        filename = 'documents://' + 
          $filter('date')(new Date(), 'yyyy_MM_dd-HH_mm_ss-sss') + 
          '.wav';    
        console.log('#### Filename: ' + filename + ' created ####');
      }
      
      media = new Media(filename, function() {
          console.log("playAudio(): Audio media/Playback Success");
          if (onAudioDone) onAudioDone.success();
        },
        function(err) {
          console.log("playAudio(): Audio Error: ", err);
          if (onAudioDone) onAudioDone.error();
        }
      );

      return {
        media: media,
        filename: filename
      };
    }

    // TODO
    function encodeToM4A() {

    }

  }

})();
