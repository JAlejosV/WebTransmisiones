(function () {
    angular.module('api')
		.controller('HistorialTarifaEscalonadaController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
			    $timeout(function () {
			        $scope.ConsultarHistorialTarifaEscalonada();
			    });
			    $scope.Salir_Click = function () {
			        $scope.$parent.SalirPopup_Click();
			    }
			    $scope.ConsultarHistorialTarifaEscalonada = function (continuar) {
			        if ($rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada > 0) {
			            var ojb = {
			                CodigoTarifaEscalonada: $rootScope.DatosFormulario.DatosTarifaEscalonada.DatosRegistro.CodigoTarifaEscalonada
			            }
			            miBlock(true, "#divPopupHistorialTarifaEscalonada");
			            var objRequest = { "filtro": JSON.parse(JSON.stringify(ojb)) };
			            $scope.gridapigrillaHistorialTarifaEscalonada.find(objRequest);
			            miBlock(false, "#divPopupHistorialTarifaEscalonada");
			        }
			    }
			}]);
})();