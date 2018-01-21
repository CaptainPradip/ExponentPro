(function() {
    'use strict';

    angular
        .module('home',[])
        .controller('homeController', homeController);
        console.log('homeController')
        homeController.$inject = ['$http','$scope','$timeout','$rootScope'];
    function homeController($http,$timeout, $scope,$rootScope) {
        $rootScope.shownav=true;

        $rootScope.$on('$viewContentLoaded', function(event) {

       
        $('.translation-button, .notification-button, .profile-dropdown').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: true // Stops event propagation
          }
        );
    })
        
        var vm = this;
        activate();

        ////////////////

        function activate() { }
    }
})();