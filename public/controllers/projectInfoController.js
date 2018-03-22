(function() {
    'use strict';

    angular
        .module('projectInfo',['projectService','ui.materialize'])
        .controller('projectInfoController', projectInfoController);
        

        projectInfoController.$inject = [
                                        '$rootScope',
                                        '$routeParams',
                                        'projectCrudService'];
    function projectInfoController($rootScope,$routeParams,projectCrudService) {
        var vm = this;

        getProjects()
        
       
       
        $('ul.tabs').tabs();
        


    $rootScope.isLoaded=false;
function getProjects(){
 
    projectCrudService.getProjectById($routeParams._id).then(function(data){
        
                 vm.project=data.data.project;
                 $rootScope.isLoaded=true
                    console.log(vm.project);
                    
            });
}


        activate();

        ////////////////

        function activate() { }
    }
})();