(function() {
    'use strict';

    angular
        .module('home',['projectService','authService'])
        .controller('homeController', homeController);
        console.log('homeController')
        homeController.$inject = ['$http',
                                  '$scope',
                                  '$timeout',
                                  '$rootScope',
                                  'projectCrudService',
                                  'authUserService',
                                  '$location',
                                  '$route'
                                 ];
    function homeController($http,$timeout, $scope,$rootScope,projectCrudService,authUserService,$location,$route) {
       
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
    
        $('.slider').slider(
         
        );
        $('.materialboxed').materialbox();
        $('.slider').height(500)

        console.log("Inside HomeCtrl....");
        
        var vm = this;
        vm.projectcategorys={};
        vm.projects={};
       
        if($location.path()=="/logout")
        {
            authUserService.logOut();
            $route.reload();
            $location.path('/home')
        }

        getcategory();
        
        

        ////////////////

        function getcategory() {
            $rootScope.shownav=true;

         projectCrudService.getProjectCategory().then(function(data){

            vm.projectcategorys=data.data.projectCategorys;

            console.log(vm.projectcategorys);
         });

         }


    }
})();