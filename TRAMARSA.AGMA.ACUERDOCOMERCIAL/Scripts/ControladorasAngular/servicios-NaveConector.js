(function () {
    angular.module('api')
         .service('ServiciosNaveConector', [ '$rootScope', '$http', function ( $rootScope, $http) {
             $rootScope.data = {
                 data: new Array(),
             }
             this.service = {
                 get: function (url, nameobj, funcion_success, funcion_error) {
                     $http({
                         method: 'GET',
                         url: url,
                         params: {
                         }
                     })
                     .success(function (data) {
                         $rootScope.data[nameobj] = data;
                         funcion_success(data);
                         $rootScope.$broadcast(nameobj + '.update');
                     }).error(function (data, status, headers, config) {
                         funcion_error(data, status, headers, config);
                     });
                 },
                 add: function (nameobj, reg) {
                     $rootScope.data[nameobj].datos.push(reg);
                 }
             };

             this.BuscarNave_Click = function () {
                 //alert($rootScope.DatosFormulario.DataFiltroBusquedaNave.Codigo + "," + $rootScope.DatosFormulario.DataFiltroBusquedaNave.Nombre + ", " + $rootScope.DatosFormulario.DataFiltroBusquedaNave.NumeroViaje);
                 if ($rootScope.DatosFormulario.DataFiltroBusquedaNave.Codigo.length > 0) {
                     if (validateForm("#BusquedaNaveFrm") == false) {
                             return false;
                         }
                         miBlock(true, "html");
                         var objRequest = { "filtros": JSON.parse(JSON.stringify($rootScope.DatosFormulario.DataFiltroBusquedaNave)) };
                         //$scope.gridapigrillaListaNaves.find(objRequest);
                         miBlock(false, "html");
                 }
             }
             
         }])
})();

