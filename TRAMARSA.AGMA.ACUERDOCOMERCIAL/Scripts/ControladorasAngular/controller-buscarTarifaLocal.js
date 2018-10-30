(function () {
    angular.module('api')
    .controller('BuscarTarifaLocalController',
     ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
     function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
         $timeout(function () {
             if ($rootScope.DatosFormulario == undefined){
                 $rootScope.DatosFormulario = new Object();
             }
             if ($rootScope.DatosFormulario.DatosTarifaLocal == undefined){
                 $rootScope.DatosFormulario.DatosTarifaLocal = new Object();
             }
             if ($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro == undefined){
                 $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro = new Object();
             }
   

             if($rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.FlagTarifaLocal)
             {
                $scope.CargaInicialBusquedaTarifaLocal(true);
                $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.FlagTarifaLocal = false;
             }else{
                $rootScope.DatosFormulario = new Object();
                $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal = new Object();
                $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial = new Object();
                $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro = new Object();
                $scope.CargaInicialBusquedaTarifaLocal(false);
             }

             //inicio temporal
             $rootScope.DatosFormulario.DatosTarifaLocal = new Object();
             $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro = new Object();
             //fin temporal
             
              $(".InputTEXT_04Fecha").prop('disabled', false);
              
         });
         $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
             var eventoclick = "";
             switch (idgrilla) {
                 case "grillaListaTarifaLocal":
                     {
                         switch (tipoboton) {
                             case "Editar":
                                 eventoclick = "$parent.EditarTarifaLocal('" + rowObject.CodigoTarifaLocal + "');";
                                 break;
                         }
                     }
                     break;
             }
             var html = "";
             if (tipoboton == "Editar") {
                 html = HtmlCrearBoton("Modificar", eventoclick, "");
             }
             return html;
         }
         $scope.EditarTarifaLocal = function (codigoTarifaLocal) {
             $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.TarifaLocalFlagEditar = true;
             $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.CodigoTarifaLocal = codigoTarifaLocal;
             $rootScope.Redirect("/#!/sistema/registro-de-tarifa-local/");
         }
         $scope.CargaInicialBusquedaTarifaLocal = function (continuar) {
             if (continuar) {
                 if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro != undefined) {
                     $scope.Buscar_Click();
                     return;
                 }
             }

             $.ajax({
                 url: "/TarifaPlana/BusquedaTarifaLocalIndex",
                 type: "POST",
                 headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                 data: "",
                 dataType: "json",
                 cache: true,
                 async: false,
                 success: function (data) {
                     if (data.Linea.length > 0) {
                         $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.Linea = data.Linea;
                         $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.Linea[0].Codigo
                         if (data.Linea.length == 1) {
                             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.Habilitado = 'False';
                         } else {
                             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.Habilitado = 'True';
                         }
                     }
                     $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.Sucursal = ObtenerSucursalesByLinea($rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoLinea);
                     //-nuevo--------------------
                     //$rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.TerminalPorturario = data.TerminalPorturario;
                     //--------------------------
                     $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.OriginalFechaVigencia = data.FechaVigencia;
                     $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.FechaVigencia = data.FechaVigencia;
                     $("#VigenteTarifaLocal").prop("checked", true);
                 }
             });
         }
         $scope.Buscar_Click = function () {
             if ($rootScope.EsEnter) {
                 return false;
             }

             if (validateForm("#BusquedaTarifaLocalFrm") == false) {
                 return false;
             }
             if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.FlagVigente == null || $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.FlagVigente == undefined) {
                 $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.FlagVigente = true;
             }
        

             if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoLinea.length > 0) {
                 miBlock(true, "html");
                 var objRequest = { "filtro": $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro };
                 $scope.gridapigrillaListaTarifaLocal.find(objRequest);
                 miBlock(false, "html");
             }
             return false;
         }
         $scope.Nuevo_Click = function () {
             $rootScope.DatosFormulario.DatosTarifaLocal.DatasRegistro.TarifaLocalFlagEditar = false;
             $rootScope.Redirect("/#!/sistema/registro-de-tarifa-local/");
         }
         $scope.Limpiar_Click = function () {
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoSucursal = null;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoTerminalPortuario = null;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.TerminalPorturario = null;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.DescripcionTarifa = null;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.FechaVigencia = null;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.FlagTarifaLigada = false;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.FlagVigente = true;
             if ($rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.Linea.length > 1) {
                 $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoLinea = null;
             }
             $("#TarifaLigadaLocal").prop("checked", false);
             $("#VigenteTarifaLocal").prop("checked", true);
         }
         $scope.CargarTerminalPortuario = function () {
             var codLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoLinea;
             var codSucursal = $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoSucursal;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.TerminalPorturario = ObtenerTerminalesByLinea(codLinea,codSucursal);
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoTerminalPortuario = null;
         }
         $scope.CargarSucursal = function () {
             var codLinea = $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoLinea;
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.Sucursal = ObtenerSucursalesByLinea(codLinea);
             $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocal.Filtro.CodigoSucursal = null;
              $rootScope.DatosFormulario.FiltrosBusquedaTarifaLocalCargaInicial.TerminalPorturario = [];
         }
         $scope.Enter = function () {
             $rootScope.EsEnter = true;
             return false;
         }
         $("input").focusout(function () {
             $rootScope.EsEnter = false;
         });
     }]);
})();