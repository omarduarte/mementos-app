(function() {
  
  angular
      .module('app.moment.items')
      .directive('newItem', newItem);

      /* @ngInject */      
      function newItem($ionicGesture, $timeout) {
        
        var directive = {
          restrict: 'EA',
          templateUrl: 'app/moment/items/newItem.directive.html',
          replace: true,
          scope: {
            moment: '='
          },
          link: link
        };

        return directive;

        function link(scope, element, attrs) {
          scope.typeSelected           = null;
          scope.insertIntoMoment       = insertIntoMoment;          
          scope.selectType             = selectType;
          scope.done                   = done;

          ///////////////////////////////////////
          

          function insertIntoMoment(type, payload) {
            scope.moment.content.push({
              type: type,
              payload: payload,
              url: null
            });
            console.log('####################');
            console.log('This is the moment: ');
            console.log(scope.moment);
          }

          function selectType(type) {
            scope.typeSelected = type;
          }

          function done() {
            scope.typeSelected = null;
          }

        }
      }      
})();
