(function () {
    angular.module('api')       
		.controller('NotificarContenedoresController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector','$compile',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector,$compile) {
			   
                $timeout(function () {
   
                });
       

              $scope.NotificarContenedor_Click=function()
               {
                  miBlock(true, "html");
                  $.ajax({
                        url: "/NotificacionContenedor/NotificarContenedor",
                        type: "POST",
                        headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                        data: "",
                        dataType: "json",
                        cache: true,
                        async: true,
                        success: function (data) {
                            miBlock(false, "html");
                            if (data.Result != null) {
                                if (data.Result.Satisfactorio === true) {
                                    MiAlert("Se ha enviado la Notifiacion Correctamente");
                                }
                                else {
                                    if (data.Result.Mensajes.length > 0) {
                                        MiError(data.Result.Mensajes[0].Mensaje);
                                    }
                                    else {
                                        MiError(data.Result.Mensaje);
                                    }
                                }
                            } else {
                                MiAlert("Ocurrió un problema interno en el sistema");
                            }
                            

                        }
                  });
               }
            
			}]);
})();