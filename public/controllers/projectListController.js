
(function() {
    'use strict';

    angular
        .module('projectList',['rzModule','projectService','projectSearchFilter'])
        .controller('projectListController', projectListController);
        


    projectListController.$inject = ['$rootScope',
                                     '$scope',
                                     '$routeParams',
                                     'projectCrudService',
                                    ];



    function projectListController($rootScope,$scope,$routeParams,projectCrudService) {
        var vm = this;
       
     
        $rootScope.mainnav=true
        console.log($routeParams._id);
        getProjectsByCategoryId();
        getProgrammingLanguage();
        getDatabaseType();
        getFrontendTechnology();
        getPlatformType();
    console.log(vm.min)
    console.log(vm.max)
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
// Initialize collapse button
$(".sidebar-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
$('.collapsible').collapsible();

$('.scrollspy').scrollSpy();




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