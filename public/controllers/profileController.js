(function() {
    'use strict';

    angular
        .module('profile',[])
        .controller('profileController', profileController);

    profileController.$inject = [];
    function profileController() {
        var vm = this;
        
        $('select').material_select();
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
        
        activate();

        ////////////////

        function activate() { }
    }
})();