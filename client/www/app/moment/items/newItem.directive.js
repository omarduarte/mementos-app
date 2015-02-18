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
          scope.newItemButtonWasTapped = false;
          scope.insertIntoMoment       = insertIntoMoment;          
          scope.selectType             = selectType;
          scope.done                   = done;

          activate();

          ///////////////////////////////////////
          
          function activate() {
            $ionicGesture.on('tap', function (ev) {
              showThenHideButtons();
            }, element);
          }

          function showThenHideButtons() {
            scope.newItemButtonWasTapped = true;
            
            $timeout(function() {
              scope.newItemButtonWasTapped = false;              
              scope.$apply();              
            }, 3500);            
            
            scope.$apply();          
          }

          function insertIntoMoment(type, url) {
            scope.moment.content.push({
              type: type,
              url: url
            });
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