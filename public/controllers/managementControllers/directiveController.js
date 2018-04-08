(function(){
    'use strict';

    angular
        .module('management')
        .component('adminNav', {
            templateUrl: '../views/component/adminNav.html',
            bindings: {
              user: '='
            },
           
          })
        .controller('directiveController', directiveController)

        directiveController.$inject = ['$location','managementCrudService'];

    function directiveController($location,managementCrudService) {
       
        var vm = this;

        activate();

        function activate() { 
            $('.collapsible').collapsible();
           
            managementCrudService.getAllProjectRequest().then(function(data){
     
                    vm.noOfProjectRequests=data.data.projects.length;
         
                   
            });
    
            

        }
    }
})();