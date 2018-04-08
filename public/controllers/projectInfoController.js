(function() {
    'use strict';

    angular
        .module('projectInfo',['projectService','ui.materialize'])
        .controller('projectInfoController', projectInfoController);
        

        projectInfoController.$inject = [
                                        '$rootScope',
                                        '$routeParams',
                                        'projectCrudService',
                                        '$interval'];
    function projectInfoController($rootScope,$routeParams,projectCrudService,$interval) {
        var vm = this;

        getProject()
        
       
       
        $('ul.tabs').tabs();
        


    $rootScope.isLoaded=false;
function getProject(){
 
    projectCrudService.getProjectById($routeParams._id).then(function(data){
        
               //  vm.project=data.data.project;
                 $rootScope.isLoaded=true
                    console.log(vm.project);
                    
                vm.project={};
                vm.project._id=data.data.project._id;
                vm.project.projectTitle=data.data.project.projectTitle;
                vm.project.projectCategory=data.data.project.projectCategory.name;
                vm.project.developer=data.data.project.developer.fullName;
                vm.project.projectIDE=data.data.project.projectIDE.name;
                vm.project.platformType=data.data.project.platformType.name;
                vm.project.databaseType=data.data.project.databaseType.name;
                vm.project.noOfDatabaseTables=data.data.project.noOfDatabaseTables;
                vm.project.noOfReportPages=data.data.project.noOfReportPages;
                vm.project.noOfProjectModules=data.data.project.noOfProjectModules;
                vm.project.moduleNames=data.data.project.moduleNames;
                vm.project.description=data.data.project.description;
               
              
                vm.project.finalPrice=data.data.project.finalPrice;
                data.data.project.screenShotUrl.push(data.data.project.indexPageUrl);
                vm.project.screenShotUrl="";
                var count = 0;
               var interval= $interval(function(){
                  
                    if(count < data.data.project.screenShotUrl.length)
                    {
                        vm.project.screenShotUrl= data.data.project.screenShotUrl[count]
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
                vm.project.programmingLanguage='';

                data.data.project.programmingLanguage.forEach(element => {
                   
                    vm.project.programmingLanguage= vm.project.programmingLanguage+', '+element.name;
                });
                vm.project.programmingLanguage= vm.project.programmingLanguage.substr(1)
                vm.project.frontendTechnology='';
                data.data.project.frontendTechnology.forEach(element => {
                    
                    vm.project.frontendTechnology= vm.project.frontendTechnology+', '+element.name;
                   
                });
                vm.project.frontendTechnology= vm.project.frontendTechnology.substr(1)
               
             
                    
            });
}


        activate();

        ////////////////

        function activate() { }
    }
})();