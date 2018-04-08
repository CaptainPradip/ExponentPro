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
                                        '$route',
                                        '$interval'];
    function projectRequestController($rootScope,$scope,$routeParams,projectCrudService,managementCrudService,$location,$route,$interval) {
        var vm = this;
        $('.materialboxed').materialbox();
        $('.modal').modal();
    console.log("Project Request Controller ")
console.log("+++++++++"+$location.path())
    switch ($location.path()) {
        case '/admin/project-requests':
               getAllProjectRequest();
              break;
        
     }
        ////////////////

        if($routeParams._id!=undefined){
           viewProjectRequest();
        }
        else{
            $location.path('/admin/project-requests')
        }
      function viewProjectRequest(){
            managementCrudService.getProjectRequest($routeParams._id).then(function(data){
                
                vm.projectRequest={};
                vm.projectRequest._id=data.data.project._id;
                vm.projectRequest.projectTitle=data.data.project.projectTitle;
                vm.projectRequest.projectCategory=data.data.project.projectCategory.name;
                vm.projectRequest.developer=data.data.project.developer.fullName;
                vm.projectRequest.projectIDE=data.data.project.projectIDE.name;
                vm.projectRequest.platformType=data.data.project.platformType.name;
                vm.projectRequest.databaseType=data.data.project.databaseType.name;
                vm.projectRequest.noOfDatabaseTables=data.data.project.noOfDatabaseTables;
                vm.projectRequest.noOfReportPages=data.data.project.noOfReportPages;
                vm.projectRequest.noOfProjectModules=data.data.project.noOfProjectModules;
                vm.projectRequest.moduleNames=data.data.project.moduleNames;
                vm.projectRequest.description=data.data.project.description;
                vm.projectRequest.isVerified=data.data.project.isVerified;
                vm.projectRequest.comment=data.data.project.comment;
                vm.projectRequest.expectedPrice=data.data.project.expectedPrice;
                data.data.project.screenShotUrl.push(data.data.project.indexPageUrl);
                vm.projectRequest.screenShotUrl="";
                var count = 0;
               var interval= $interval(function(){
                  
                    if(count < data.data.project.screenShotUrl.length)
                    {
                        vm.projectRequest.screenShotUrl= data.data.project.screenShotUrl[count]
                        count++;
                        
                    }else{
                        count=0;
                    }
                    

                },2000)
                
            //    indexPageUrl
            //    screenShotUrl
            //    videoUrl
            //    projectCode
            //    expectedPrice
            //    finalPrice
            //    noOfDownload
            //    noOfView
            //    isVerified
            //    uploadedDate
            //    verifiedBy
               
                //projectRequest.isVerified=element.isVerified;
                vm.projectRequest.programmingLanguage='';

                data.data.project.programmingLanguage.forEach(element => {
                   
                    vm.projectRequest.programmingLanguage= vm.projectRequest.programmingLanguage+', '+element.name;
                });
                vm.projectRequest.programmingLanguage= vm.projectRequest.programmingLanguage.substr(1)
                vm.projectRequest.frontendTechnology='';
                data.data.project.frontendTechnology.forEach(element => {
                    
                    vm.projectRequest.frontendTechnology= vm.projectRequest.frontendTechnology+', '+element.name;
                   
                });
                vm.projectRequest.frontendTechnology= vm.projectRequest.frontendTechnology.substr(1)
               
             });
            
        }


        function getAllProjectRequest() {
            managementCrudService.getAllProjectRequest().then(function(data){
 
                vm.projectRequests=data.data.projects;
     
                console.log(vm.projectRequests);
             });

         }
         vm.verifyProjectRequest=function(_id){
             console.log(_id);

             var projectRequest={}
             projectRequest.isVerified=true;
             projectRequest.comment=vm.finalcomment;
             projectRequest.finalPrice=vm.finalPrice
             managementCrudService.updateProjectRequest(_id,projectRequest).then(function(data){
                 
                $route.reload();     
            });
         }

         vm.closeProjectRequestModel=function () {
            $('#updateProjectRequest').modal('close');
        }

        vm.showProjectRequestModel=function(){
            $('#updateProjectRequest').modal('open');
        }
        vm.showVerifyProjectRequestModel=function(){
            $('#verifyProjectRequest').modal('open');
        }
         vm.updateProjectRequest=function(comment,_id){
            

            var projectRequest={}
            projectRequest.isVerified=false;
            projectRequest.comment=comment;
            projectRequest.finalPrice=vm.finalPrice
            console.log(projectRequest);
            managementCrudService.updateProjectRequest(_id,projectRequest).then(function(data){
              $('#updateProjectRequest').modal('close');
               $route.reload();     
           });
        }
        
    }
})();