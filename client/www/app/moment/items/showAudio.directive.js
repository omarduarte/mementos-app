(function() {
  
  angular
      .module('app.moment.items')
      .directive('showAudio', showAudio);

      /* @ngInject */      
      function showAudio(Audio) {
        
        return {
          restrict: 'EA',
          replace: true,
          templateUrl: 'app/moment/items/showAudio.directive.html',
          link: link         
        };

        function link (scope, element, attrs) {
          var vm = scope;
                    
          vm.exit        = exit;

          vm.play        = play;
          vm.stop        = stop;

          vm.onAudioDone = {};
          vm.playback    = null;
          vm.status      = 'empty';
          
          activate();


          //////////////////////////////////////////////////////


          function activate() {
            console.log('Activating Audio Playback Directive');

            vm.onAudioDone.success = function() {
              vm.status = 'ready';
              vm.$digest();
            };
            vm.onAudioDone.error = function() {
              vm.status = 'empty';
              vm.$digest();
            };

            vm.playback = Audio.getMediaObject(vm.item.payload, vm.onAudioDone);
            vm.status = 'ready';
          }

          function play() {
            console.log('######### Attempting to Playback #########');            
            vm.playback.media.play();
            vm.status = 'playing';          
          }

          function stop() {
            console.log('######### Stopping Playback #########');
            vm.playback.media.stop();
            vm.status = 'ready';
          }

          function exit() {
            vm.playback && vm.playback.media.release();
            vm.playback   = null;
            vm.status = 'empty';
            vm.done();
          }
        }
      }      
})();
