(function() {
    'use strict';

    angular
        .module('projectInfo',[])
        .controller('projectInfoController', projectInfoController);

        projectInfoController.$inject = ['$rootScope'];
    function projectInfoController($rootScope) {
        var vm = this;
        $('.carousel').carousel(
            {fullWidth: true}
        );
        $('.slider').slider();
        $('.materialboxed').materialbox();
        $('ul.tabs').tabs();
        
        activate();

        ////////////////

        function activate() { }
    }
})();