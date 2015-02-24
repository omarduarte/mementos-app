(function() {
  
  angular
      .module('app.moment.items')
      .directive('newImage', newImage);

      /* @ngInject */      
      function newImage(Camera) {
        
        return {
          restrict: 'EA',
          replace: true,
          templateUrl: 'app/moment/items/newImage.directive.html',          
          link: link         
        };

        function link (scope, element, attrs) {
          scope.saveImage = saveImage;
          scope.cancel = cancel;
          scope.imageHasBeenTaken = false;
          scope.image;

          activate();
          
          //////////////////////////////////////////

          function activate() {
            Camera.takePhoto()
            .then(function(image) {
              scope.image = image;
              scope.imageHasBeenTaken = true;              
            })
            .catch(function(err) {
              console.error(err);
            });
          }

          function saveImage(image) {
            scope.insertIntoMoment('image', image);
            Camera.cleanup();
            scope.done();
          }
          
          function cancel() {
            scope.imageHasBeenTaken = false;
            scope.image = true;
            Camera.cleanup();
            scope.done();
          }

        }
      }      
})();
