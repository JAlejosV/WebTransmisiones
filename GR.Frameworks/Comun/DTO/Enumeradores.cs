using System;
using System.Collections.Generic;
using System.Linq;

namespace GR.Frameworks
{
    //Los que son valores de Catalogo de Tablas, deben coincidir con la columna CodigoTabla de la tabla CatalogoTablas
    public enum KeyCache
    {
        CatalogoTablas,
        Bancos,
        TipoDocumento,
        TipoMoneda,
        TipoRecargo,
        Sucursal,
        TerminalPortuario,
        Linea,
        Moneda,
        Puerto,
        DetalleCatalogo,
        TipoContenedor,
        ClaseContenedor,
        ParametroNegocio,
        ConfiguracionLinea,
        DetalleCatalogoTramarsa,
        Almacen,
        Rol,
        TipoBL,
        TipoEnvio,
        TipoOperacion,
        CondicionContrato,
        ModoPago,
        CondicionCarga,
        CondicionTransporte,
        Temperatura,
        TipoTransmisionNave,
        TipoTransmisionDocumento
    }

    public enum TablaTablas
    {

        /*CatalogoTablas*/
        TipoVigencia = 1,//-----------------------------------------------
        TipoValorVigencia = 2,//-----------------------------------------------
        Regimen = 3,//-----------------------------------------------
        Estado = 4,//-----------------------------------------------
        UnidadDeCalculo = 5,//-----------------------------------------------
        TipoFechaCalculo = 6,//-----------------------------------------------
        TipoConfiguracionTarifa = 7,//-----------------------------------------------
        TipoDias = 8,//-----------------------------------------------
        Condicion = 9,//-----------------------------------------------
        TipoConfiguracionTarifaLigada = 12,//-----------------------------------------------
        TipoCriterio = 14,//-----------------------------------------------
        TipoPuerto = 17,//-----------------------------------------------
        TipoDescuento = 13,//-----------------------------------------------
        TipoDocumento = 18,//-----------------------------------------------
        TipoDocumentoOrigen = 20,
        EstadoAcuerdoComercial = 15,
        RolClienteBlMaster = 23,
        RolClienteBlHouse = 26,
        TipoCarga = 29,
        TipoCobroTarifa = 30,
        TipoCobroAcuerdo = 31,
        RolRatp = 32,
        TipoBL = 19,
        TipoFrecuencia = 33,
        /*CatalogoTablas*/
    }

    public enum TablaTablasTramarsa
    {
        EstadosRegistro = 2,
        EstadosIntegracion = 10,
        EstadosDepositoDefault = 11
    }

    public class ParametrosNegocio
    {

        /*CatalogoTablas*/
        public static string TipoDescuentoTarifaACEscalonado = "TipoDescuentoTarifaACEscalonado";
        public static string MonedaTarifaACEscalonado = "MonedaTarifaACEscalonado";
        public static string MontoAcuerdoTarifaACEscalonado = "MontoAcuerdoTarifaACEscalonado";
        /*CatalogoTablas*/
    }
}
