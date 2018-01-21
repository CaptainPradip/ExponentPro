(function() {
    'use strict';

    angular
        .module('management',[])
        .controller('managementController', managementController);

        managementController.$inject = [];
    function managementController() {
        console.log("managementcontroller");
        var vm = this;
        

        activate();

        ////////////////

        function activate() {


         }
    }
})();