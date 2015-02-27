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
          
          vm.saveAudio   = saveAudio;
          vm.restart     = restart;
          vm.exit        = exit;

          vm.startRecord = startRecord;
          vm.stopRecord  = stopRecord;
          vm.play        = play;
          vm.stop        = stop;

          vm.onAudioDone = {};
          vm.recording   = null;
          vm.status      = 'empty';
          
          activate();

          //////////////////////////////////////////

          function activate() {
            console.log('Activating Audio Recording Directive');
            console.log(vm);
            vm.onAudioDone.success = function() {
              vm.status = 'ready';
              vm.$digest();
            };
            vm.onAudioDone.error = function() {
              vm.status = 'empty';
              vm.$digest();
            };
          }

          function startRecord() {
            console.log('######### Attempting to Record #########');
            
            vm.recording = Audio.getMediaObject(null, vm.onAudioDone);
            vm.recording.media.startRecord();
            vm.status = 'recording';            
          }

          function stopRecord() {
            console.log('######### Stoped Recording #########');
            vm.recording.media.stopRecord();
          }

          function play() {
            console.log('######### Attempting to Playback #########');            

            vm.recording.media.play();
            vm.status = 'playing';          
          }

          function stop() {
            console.log('######### Stopping Playback #########');
            vm.recording.media.stop();
            vm.status = 'ready';
          }

          function restart() {
            // TODO: Delete previous audio file
            vm.recording = null;
            vm.status = 'empty';
          }
          

          function saveAudio() {
            // Converto to M4A
            vm.insertIntoMoment({
              type: 'audio/wav',
              payload: vm.recording.filename,
              url: null
            });
            vm.exit();
          }

          function exit() {
            vm.recording.media.release();
            vm.recording   = null;
            vm.status = 'empty';
            vm.done();
          }
        }
      }      
})();
