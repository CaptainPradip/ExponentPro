(function() {
    'use strict';

    angular
        .module('management',['projectService','managementService'])
        
        .controller('managementController', managementController)
        

        managementController.$inject = [    '$rootScope',
                                            '$scope',
                                            '$routeParams',
                                            'projectCrudService',
                                            'managementCrudService',
                                            '$location',
                                            '$route'];
    function managementController($rootScope,$scope,$routeParams,projectCrudService,managementCrudService,$location,$route){

        console.log("managementcontroller");
        var vm = this;
       



      
                
        // Get all URL parameter
       

              switch ($location.path()) {
                case '/admin':
                          getProjectIDE();
                      break;
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
        
     
        vm.showEditBox=function(_id,name){
                    vm._id=_id;
                    vm.Name=name;
                
                    vm.edit=true;
                }

//Category Crud 
        vm.addCategory= function(){

                        console.log(vm.name);
                        var projectCategory={}
                        projectCategory.name=vm.name;
                        managementCrudService.addProjectCategory(projectCategory).then(function(data){
        
                        swal({title: data.data.message,   
                        text: "I will close in 2 seconds.",   
                        timer: 2000,   
                        showConfirmButton: false 
            });
                   
                   $route.reload();
                 
            });

        }

        

        vm.updateCategory = function(){

           
                var projectCategory={}
                projectCategory.name=vm.Name;
                managementCrudService.updateProjectCategory(vm._id,projectCategory).then(function(data){
                    
                               $route.reload();     
                        });
              
        }
        vm.deleteCategory = function (_Id){
         
            managementCrudService.deleteProjectCategory(_Id).then(function(data){
                 
                           $route.reload();
                         
                    });
            
        }

//Frontend Technology 
        vm.addFrontendTechnology= function(){

                        console.log(vm.name);
                        var frontendTechnology={}
                        frontendTechnology.name=vm.name;
                        managementCrudService.addFrontendTechnology(frontendTechnology).then(function(data){
        
                        swal({title: data.data.message,   
                        text: "I will close in 2 seconds.",   
                        timer: 2000,   
                        showConfirmButton: false 
            });
                   
                   $route.reload();
                 
            });

        }

        

        vm.updateFrontendTechnology = function(){

           
                var frontendTechnology={}
                frontendTechnology.name=vm.Name;
                managementCrudService.updateFrontendTechnology(vm._id,frontendTechnology).then(function(data){
                    
                               $route.reload();     
                        });
              
        }
        vm.deleteFrontendTechnology = function (_Id){
         
            managementCrudService.deleteFrontendTechnology(_Id).then(function(data){
                 
                           $route.reload();
                         
                    });
            
        }

//Programming Language 
        vm.addProgrammingLanguage= function(){

                        console.log(vm.name);
                        var programmingLanguage={}
                        programmingLanguage.name=vm.name;
                        managementCrudService.addProgrammingLanguage(programmingLanguage).then(function(data){
        
                        swal({title: data.data.message,   
                        text: "I will close in 2 seconds.",   
                        timer: 2000,   
                        showConfirmButton: false 
            });
                   
                   $route.reload();
                 
            });

        }

        

        vm.updateProgrammingLanguage = function(){

           
                var programmingLanguage={}
                programmingLanguage.name=vm.Name;
                managementCrudService.updateProgrammingLanguage(vm._id,programmingLanguage).then(function(data){
                    
                               $route.reload();     
                        });
              
        }
        vm.deleteProgrammingLanguage = function (_Id){
         
            managementCrudService.deleteProgrammingLanguage(_Id).then(function(data){
                 
                           $route.reload();
                         
                    });
            
        }
//Platform Type
      vm.addPlatformType= function(){

                      
                        var platformType={}
                        platformType.name=vm.name;
                        managementCrudService.addPlatformType(platformType).then(function(data){
        
                        swal({title: data.data.message,   
                        text: "I will close in 2 seconds.",   
                        timer: 2000,   
                        showConfirmButton: false 
            });
                   
                   $route.reload();
                 
            });

        }

        vm.updatePlatformType = function(){

           
                var platformType={}
                platformType.name=vm.Name;
                managementCrudService.updatePlatformType(vm._id,platformType).then(function(data){
                    
                               $route.reload();     
                        });
              
        }
        vm.deletePlatformType = function (_Id){
         
            managementCrudService.deletePlatformType(_Id).then(function(data){
                 
                           $route.reload();
                         
                    });
            
        }

//Database Type
        vm.addDatabaseType= function(){

                      
                        var databaseType={}
                        databaseType.name=vm.name;
                        managementCrudService.addDatabaseType(databaseType).then(function(data){
        
                        swal({title: data.data.message,   
                        text: "I will close in 2 seconds.",   
                        timer: 2000,   
                        showConfirmButton: false 
            });
                   
                   $route.reload();
                 
            });

        }

        vm.updateDatabaseType = function(){

           
                var databaseType={}
                databaseType.name=vm.Name;
                managementCrudService.updateDatabaseType(vm._id,databaseType).then(function(data){
                    
                               $route.reload();     
                        });
              
        }
        vm.deleteDatabaseType = function (_Id){
         
            managementCrudService.deleteDatabaseType(_Id).then(function(data){
                 
                           $route.reload();
                         
                    });
            
        }
//Project IDE

         vm.addProjectIDE= function(){

                      
                        var projectIDE={}
                        projectIDE.name=vm.name;
                        managementCrudService.addProjectIDE(projectIDE).then(function(data){
        
                        swal({title: data.data.message,   
                        text: "I will close in 1 seconds.",   
                        timer: 1000,   
                        showConfirmButton: false 
            });
                   
                   $route.reload();
                 
            });

        }

        vm.updateProjectIDE = function(){

           
                var projectIDE={}
                projectIDE.name=vm.Name;
                managementCrudService.updateProjectIDE(vm._id,projectIDE).then(function(data){
                    
                               $route.reload();     
                        });
              
        }
        vm.deleteProjectIDE = function (_Id){
         
            managementCrudService.deleteProjectIDE(_Id).then(function(data){
                 
                           $route.reload();
                         
                    });
            
        }




        function getcategory() {
           
 
         projectCrudService.getProjectCategory().then(function(data){
 
            vm.projectCategorys=data.data.projectCategorys;
 
            console.log(vm.projectCategorys);
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