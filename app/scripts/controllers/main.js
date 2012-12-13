'use strict';

bigvioCalculatorApp.controller('MainCtrl', ['$scope', function($scope, $location) {
  $scope.vm =  {
    ram: 1,
    windows: false,
    cores: 1,
    disk: {
        ordinary: 25,
        fast: 0,
        ssd: 0,
    },
    data: 200,
    price: function() { 
        var base_price = 10;
        var total = base_price + ((this.ram-1)*10);
        total += ((this.disk.ordinary-25) /10) * 2;
        total += (this.disk.fast/5)*2;
        total += (this.disk.ssd/0.5)*2;
        total += ((this.data-200)/50) * 2;
        return total;
    },
  };
  $scope.change_cores = function (){
      // set ram to match minimum for no cores. so if you add cores
      // you get the right amount of ram
      if ($scope.vm.cores > ($scope.vm.ram / 4)) {
        $scope.vm.ram = (($scope.vm.cores - 1) * 4)||1;
        return;
      }
      if ($scope.vm.cores < (($scope.vm.ram +1)/ 4)) {
        $scope.vm.ram = (($scope.vm.cores - 1) * 4)||1;
      }

  }
  $scope.change_ram = function (){
      // handle the opposite case, if you add more ram, get right number of cores
      if ($scope.vm.ram > 60) {
          $scope.vm.cores = 16;
          return;
      }
      // more ram than cores then up the cores
      if ((($scope.vm.ram +1)/ 4) > $scope.vm.cores) {
          $scope.vm.cores = Math.floor(($scope.vm.ram/4))+1;
          return;
      }
      // less cores than ram should give you more cores
      if ($scope.vm.cores > (($scope.vm.ram)/4)) {
          $scope.vm.cores = Math.floor(($scope.vm.ram/4))+1;
      }
  }
  $scope.change = function() { 
      if (!!event && !!event.target && !!event.target.id ) {
          switch (event.target.id) {
              case 'ram':
                  $scope.change_ram();
                  break;
              case 'cores':
                  $scope.change_cores();
          }
          // special case
          // for when > 60GB
          if ($scope.vm.ram >= 60) {
              $scope.vm.cores = 16;
          }
      }
  };
}]);

