'use strict';

bigvioCalculatorApp.controller('MainCtrl', function($scope) {
  $scope.vm = {
    ram: 3,
    windows: false,
    cores: 1,
    disk_space: {
        ordinary: 25,
        fast: 0,
        ssd: 0,
        data: 200,
    },
    price: function() { 
        var base_price = 10;

        return base_price + ((this.ram-1)*10);
    },
    min_ram: function() {
        debugger;
        if (($scope.vm.cores-1) > 0) {
         return (4 * ($scope.vm.cores-1));
        }
        return 1;
    },
    min_cores: function() {
        debugger;
        return this.ram / 4
    },
  };
  $scope.change = function() {
      if (($scope.vm.ram / 4) < ($scope.vm.cores -1)) {
          $scope.vm.ram = (4 * ($scope.vm.cores-1));
      }
      console.log($scope);
  }
});
