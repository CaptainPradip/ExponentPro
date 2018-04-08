(function(){
    'use strict';

    angular
        .module('management')
        .controller('projectsController', projectsController)

        projectsController.$inject = [
                                        '$rootScope',
                                        '$scope',
                                        '$routeParams',
                                        'managementCrudService'];

    function projectsController($rootScope,$scope,$routeParams,managementCrudService) {
     
        var vm = this;
       
        console.log('projectsController+++++++++++++++')
       
        getProjectAllProjects();

function getProjectAllProjects(){

    managementCrudService.getProjectAllProject().then(function(data){
        var clients=[]
       
                 vm.projects=data.data.projects;
                 console.log(data.data.projects);
                for (let index = 0; index < vm.projects.length; index++) {
                    var project={}
                    let element = vm.projects[index];
                    project.projectTitle=element.projectTitle;
                    project.projectCategory=element.projectCategory.name;
                    project.projectIDE=element.projectIDE.name;
                    console.log(element.projectIDE.name);
                    project.platformType=element.platformType.name;
                    project.databaseType=element.databaseType.name;
                    project.developer=element.developer.fullName;
                   
                    project.verifiedBy=element.verifiedBy.userName
                    project.noOfDownload=element.noOfDownload;
                    project.finalPrice=element.finalPrice;
                    project.isVerified=element.isVerified;
                    project.programmingLanguage='';
                    element.programmingLanguage.forEach(element => {
                       
                        project.programmingLanguage= project.programmingLanguage+', '+element.name;
                    });
                    project.programmingLanguage= project.programmingLanguage.substr(1)
                    project.frontendTechnology='';
                    element.frontendTechnology.forEach(element => {
                        
                        project.frontendTechnology= project.frontendTechnology+', '+element.name;
                       
                    });
                    project.frontendTechnology= project.frontendTechnology.substr(1)
                    clients.push(project);
                }
                
                    console.log(vm.projects);
                    activate(clients);
                 });
}

        function activate(clients) { 


            
  
           
         
            
         
            $("#jsGrid").jsGrid({
                width: "100%",
                height: "100%",
         
                filtering: true,
                sorting: true,
                paging: true,
                autoload: true,
                pageSize: 5,
                pageButtonCount: 5,
         
                data: clients,
         
                fields: [
                    { name: "projectTitle",title: "Project Name", type: "text", width: 150, validate: "required" ,filtering: true},
                    { name: "projectCategory",title: "Project Category", type: "text",width: 100 ,filtering: true},
                    { name: "programmingLanguage",title: "Programming Language", type: "text", width: 100 ,filtering: true},
                    { name: "frontendTechnology", title: "Frontend Technology",type: "text", width: 100 ,filtering: true},
                    { name: "projectIDE",title: "Project IDE", type: "text", width: 100 ,filtering: true},
                    { name: "platformType",title: "Platform Type", type: "text", width: 100 ,filtering: true},
                    { name: "databaseType", title: "Database Type",type: "text", width: 100,filtering: true},
                    { name: "developer", title: "Developer Name",type: "text", width: 100 ,filtering: true},
                    { name: "noOfDownload", title: "Downloads",type: "number", width: 100 ,filtering: true},
                    { name: "finalPrice", title: "Final Price",type: "number", width: 55 ,filtering: true},
                    { name: "isVerified", title: "isVerified",type: "checkbox",width: 80,filtering: true },
                    { name: "verifiedBy", title: "Verified By",type: "text",width: 80,filtering: true },
                    { type: "control",editButton: false,deleteButton:false }
                ]
            });


        }
    }
})();