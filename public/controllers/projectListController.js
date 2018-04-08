
(function() {
    'use strict';

    angular
        .module('projectList',['rzModule','projectService','projectSearchFilter'])
        .controller('projectListController', projectListController);
        


    projectListController.$inject = ['$rootScope',
                                      '$location',
                                      '$scope',
                                      '$routeParams',
                                      'projectCrudService',
                                    ];



    function projectListController($rootScope,$location,$scope,$routeParams,projectCrudService) {
        var vm = this;
        $rootScope.mainnav=true
               
        // Initialize collapse button
        $(".sidebar-collapse").sideNav();
        // Initialize collapsible (uncomment the line below if you use the dropdown variation)
        $('.collapsible').collapsible();

        $('.scrollspy').scrollSpy();

        getProgrammingLanguage();
        getDatabaseType();
        getFrontendTechnology();
        getPlatformType();

        $scope.slider = {
          minValue: 0,
          maxValue: 10000,
          options: {
            floor: 0,
            ceil: 10000,
            translate: function(value, sliderId, label) {
              switch (label) {
                case 'model':
                vm.min=value;
                  return '<b>Min</b> ₹' + value;
                case 'high':
                vm.max=value;
                  return '<b>Max:</b> ₹' + value;
                default:
                  return '$' + value
              }
            }
          }
        };
        
        switch ($location.path()) {
          case '/projects':
          $rootScope.isLoaded=false;
                getAllProject();
                    //Decalre function for advance updates
                break;
          case '/projects/search/'+$routeParams.key:
      
                $rootScope.isLoaded=false;
                getSearchProject();
                    //Decalre function for advance updates
                break;
          default:
          $rootScope.isLoaded=false;
                console.log($routeParams._id);
                getProjectsByCategoryId();

                break;
        }

        
function getAllProject(){

          projectCrudService.getProjectAllProject().then(function(data){

              vm.projects=data.data.projects;
              $rootScope.isLoaded=true
              console.log(vm.projects);
           });
  


       }
       
function getSearchProject(){

          projectCrudService.getProjectAllProject().then(function(data){

              vm.projects=data.data.projects;
              $rootScope.isLoaded=true
              console.log(vm.projects);
           });
  


       }
function getProjectsByCategoryId(){
 
      projectCrudService.getProjectByCategoryId($routeParams._id).then(function(data){
          
                   vm.projects=data.data.projectCategory.project;
                   $rootScope.isLoaded=true
                      console.log(vm.projects);
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
           vm.databaseTypes=data.data.databaseTypes
           ;
                   
                 
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

        activate();

        ////////////////

        function activate() { 

      


        }
    }
})();