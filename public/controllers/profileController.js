(function() {
    'use strict';

    angular
        .module('profile',['authService','projectService','ui.materialize'])
        .controller('profileController', profileController);
        
    profileController.$inject = ['authUserService', '$rootScope','$route','projectCrudService'];
    function profileController(authUserService, $rootScope,$route,projectCrudService) {
        var vm = this;
        $rootScope.isLoaded=false
        
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false // Close upon selecting a date,
          });
        $('ul.tabs').tabs();
        $('.modal').modal();
        $('.dropify').dropify();
        vm.showAddprojectModel=function(){
            $('#addProject').modal('open');
            
          vm.v1=Math.floor((Math.random() * 100) + 1)
          vm.v2=Math.floor((Math.random() * 100) + 1)

         
        projectCrudService.getProjectCategory().then(function(data){
                vm.projectCategorys=data.data.projectCategorys;
                    
                 });
        projectCrudService.getProgrammingLanguage().then(function(data){
                    vm.programmingLanguages=data.data.programmingLanguages;
                        
                     });
        projectCrudService.getFrontendTechnology().then(function(data){
                    vm.frontendTechnologys=data.data.frontendTechnology;
                    
                   });
        projectCrudService.getDatabaseType().then(function(data){
                    vm.databaseTypes=data.data.databaseTypes;
                    
                   });
     

        projectCrudService.getPlatformType().then(function(data){
                    vm.platformTypes=data.data.platformTypes            ;
                    
                   });

        projectCrudService.getProjectIDE().then(function(data){
                    vm.projectIDEs=data.data.projectIDEs            ;
                    
                   });
  
      
}
        vm.closeAddprojectModel=function () {
            $('#addProject').modal('close');
        }

        vm.showUpdateProfileModel=function(){
            $('#updateUserProfile').modal('open');
        }
        vm.closeUpdateProfileModel=function () {
            $('#updateUserProfile').modal('close');
        }
        getUserProfile();

        ////////////////

        function getUserProfile() {
            authUserService.getUser().then(function(data){
                vm.user=data.data.user;
                $rootScope.isLoaded=true
                
            })

         }


        
         vm.UpdateUserProfile=function(user){
            user.profilePicture= $('#input-file-max-fs')[0].files[0];
            user.dateOfBirth=$('#dateOfBirth').val();
                ;

            authUserService.updateUserProfile(user).then(function (data) {
                
                $rootScope.isLoaded=true
                vm.closeUpdateProfileModel();
                $route.reload();
                    
                });
        
         }
         vm.addNewProject=function(project){
            // var screenShots=[];
            // console.log($('#screenShots')[0].files);
            // angular.forEach($('#screenShots')[0].files,(file) => {
            //     screenShots.push(file)
            // });
            vm.closeAddprojectModel();
            $rootScope.isLoaded=false
            project.indexPage=$('#indexPage')[0].files[0];
           // project.video=$('#video')[0].files[0];
            var screenShots =$('#screenShots')[0].files;
            //project.screenShots=screenShots;
           // project.projectCode=$('#projectCode')[0].files[0];
           // project.projectReport=$('#projectCode')[0].files[0];
            console.log(project);
            projectCrudService.addNewProject(project,screenShots).then(function (data) {
                
                $rootScope.isLoaded=true
               
                $route.reload();
                    
                });

            
         }
    }
})();