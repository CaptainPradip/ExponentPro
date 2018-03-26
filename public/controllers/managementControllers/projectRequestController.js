(function() {
    'use strict';

    angular
        .module('management')
        .controller('projectRequestController', projectRequestController);

    projectRequestController.$inject = [
                                        '$rootScope',
                                        '$scope',
                                        '$routeParams',
                                        'projectCrudService',
                                        'managementCrudService',
                                        '$location',
                                        '$route'];
    function projectRequestController($rootScope,$scope,$routeParams,projectCrudService,managementCrudService,$location,$route) {
        var vm = this;
        
    console.log("Project Request Controller ")

    switch ($location.path()) {
        case '/admin/project-requests':
               getAllProjectRequest();
              break;
        
     }
        ////////////////
        vm.viewProjectRequest=function(_id){
            managementCrudService.getProjectRequest(_id).then(function(data){
 
                vm.projectRequest=data.data.project;
     
                console.log(vm.projectRequest);
                $location.path('/admin/project-request')
             });
            
        }









        function getAllProjectRequest() {
            managementCrudService.getAllProjectRequest().then(function(data){
 
                vm.projectRequests=data.data.projects;
     
                console.log(vm.projectRequests);
             });

         }
    }
})();