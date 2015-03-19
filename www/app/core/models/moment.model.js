(function() {

  angular
    .module('app.models')
    .factory('MomentModel', MomentModel);

  function MomentModel() {
    var moment = {};

    var momentModel = {
      set: set,
      reset: reset,
      get: get,
      constructor: constructor
    };

    return momentModel;
    
    function set(newMoment) {
      moment = angular.copy(newMoment);
      return newMoment;
    }

    function reset() {
      moment = {};
    }

    function get() {
      return angular.copy(moment);
    }

    function constructor() {
      var today = new Date();
      this.title = '';
      this.content = [];       
      this.meta = {
        location: {
          latitude: null,
          longitude: null,
          place: ''
        }
      };
    }
  }

})();
