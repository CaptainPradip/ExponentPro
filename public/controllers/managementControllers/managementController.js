(function() {
    'use strict';

    angular
        .module('management',['projectService'])
        .component('adminNav', {
            templateUrl: '../../views/component/adminNav.html',
            bindings: {
              user: '='
            },
           
          })
        .controller('managementController', managementController)
        

        managementController.$inject = ['$rootScope',
                                            '$scope',
                                            '$routeParams',
                                            'projectCrudService',
                                            '$location'];
    function managementController($rootScope,$scope,$routeParams,projectCrudService,$location){

        console.log("managementcontroller");
        var vm = this;
        $('.collapsible').collapsible();



      
        console.log('Current route name: ' + $location.path());
        // Get all URL parameter
       

              switch ($location.path()) {
                  case '/admin/project-category':
                          getcategory();
                      break;
                  case '/admin/project-frontend-technology':
                          getFrontendTechnology();
                      break;
                  case '/admin/project-programming-language':
                          getProgrammingLanguage();
                      break;
                  case '/admin/project-platform-type':
                          getPlatformType();
                      break;
                  case '/admin/project-database-type':
                          getDatabaseType();
                      break;
                  case '/admin/project-ide-type':
                          getProjectIDE();
                  
                      break;
                  
                  default:
                      break;
              }
        
     



       vm.addCategory = function addCategory(){

       console.log(vm.name);

        }



        function getcategory() {
            $rootScope.shownav=true;
 
         projectCrudService.getProjectCategory().then(function(data){
 
            vm.projectcategorys=data.data.projectCategorys;
 
            console.log(vm.projectcategorys);
         });
 
         }

        function getProgrammingLanguage(){
            
                projectCrudService.getProgrammingLanguage().then(function(data){
                    
                            vm.programmingLanguages=data.data.programmingLanguages;
                        
                                console.log(data.data);
                            });
            }


        function getDatabaseType(){
        
            projectCrudService.getDatabaseType().then(function(data){
                vm.databaseTypes=data.data.databaseTypes;
                        console.log(data.data);
                        });
        }


        function getFrontendTechnology(){
        
            projectCrudService.getFrontendTechnology().then(function(data){
                vm.frontendTechnologys=data.data.frontendTechnology;
                console.log(data.data);
                        });
        }


        function getPlatformType(){
        
            projectCrudService.getPlatformType().then(function(data){
                    vm.platformTypes=data.data.platformTypes            ;
                console.log(data.data);
                        });
        }

        function getProjectIDE(){
            
                projectCrudService.getProjectIDE().then(function(data){
                        vm.projectIDEs=data.data.projectIDEs            ;
                    console.log(data.data);
                            });
            }

    }
})();