(function() {
  
  angular
      .module('app.moment.items')
      .directive('newAudio', newAudio);

      /* @ngInject */      
      function newAudio(Audio) {
        
        return {
          restrict: 'EA',
          replace: true,
          templateUrl: 'app/moment/items/newAudio.directive.html',
          link: link         
        };

        function link (scope, element, attrs) {
          var vm = scope;
          
          vm.saveAudio      = saveAudio;
          vm.startRecording = startRecording;
          vm.stopRecording  = stopRecording;
          vm.play           = play;
          vm.stop           = stop;
          vm.exit           = exit;

          vm.audioFilename        = '';
          vm.mediaObject          = null;
          vm.audioHasBeenRecorded = false;


          activate();
          
          //////////////////////////////////////////

          function activate() {
            
            // All the vm bindings go here!
          }

          function startRecording() {
            Audio.startRecording()
            .then(function(mediaObject, audioFilename) {
              vm.mediaObject = mediaObject;
              vm.audioFilename = audioFilename;
            })
          }

          function stopRecording() {
            Audio.stopRecording(mediaObject);
            vm.audioHasBeenRecorded = true;
          }

          function play() {
            Audio.play(vm.audioFilename)
            .then(function(mediaObject) {
              vm.mediaObject = mediaObject;
            });
          }
          
          function exit() {
            vm.mediaObject = null;
            vm.audioHasBeenRecorded = false;
            vm.done();
          }

          function saveAudio() {
            vm.insertIntoMoment({
              type: 'audio/wav',
              payload: Audio.getFilePath(vm.audioFilename),
              url: null
            });
            vm.exit();
          }

        }
      }      
})();
