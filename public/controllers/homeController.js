(function() {
    'use strict';

    angular
        .module('home',[])
        .controller('homeController', homeController);
        console.log('homeController')
        homeController.$inject = ['$http','$scope','$timeout','$rootScope'];
    function homeController($http,$timeout, $scope,$rootScope) {
       
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
    
        $('.slider').slider(
         
        );
        $('.materialboxed').materialbox();
        $('.slider').height(500)


        
        var vm = this;
        activate();

        ////////////////

        function activate() { }
    }
})();