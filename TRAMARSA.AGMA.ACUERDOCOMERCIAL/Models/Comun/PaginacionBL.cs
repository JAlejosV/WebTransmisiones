using System.Collections.Generic;
using System.Data;
using System.Linq;
using GR.Frameworks;
using TRAMARSA.AGMA.ACUERDOCOMERCIAL.Models.Comun;

public static class PaginacionBL
{
    public static List<T> PaginarLista<T>(List<T> lista, PaginacionDTO paginacionDTO, out int nroRegistros, string ordenDefault = "", string orientacion = "")
    {
        List<T> salida = new List<T>();

        nroRegistros = lista.Count;
        if (paginacionDTO.HabilitarPaginacion == true)
        {
            bool hayorden = false;
            if (paginacionDTO.sidx != null)
                if (paginacionDTO.sidx.Length > 0)
                    hayorden = true;
            if (!hayorden)
            {
                paginacionDTO.sidx = ordenDefault;
                if (orientacion != string.Empty)
                {
                    paginacionDTO.sord = orientacion;
                }
            }

            string orden = paginacionDTO.GetOrdenamiento().Trim();
            if (orden.Length > 0)
            {
                string sortfield = orden.Split(' ')[0].Trim();
                string sortExpression = orden.Split(' ')[1].ToUpper().Trim();

                if (sortExpression == "ASC")
                {
                    salida = lista.OrderBy(
                            x => Helper.GetPropertyValue(x, sortfield)
                        ).Skip((paginacionDTO.GetNroPagina() - 1) * paginacionDTO.GetNroFilas()).Take(paginacionDTO.GetNroFilas()).ToList();
                }
                else
                {
                    salida = lista.OrderByDescending(
                                x => Helper.GetPropertyValue(x, sortfield)
                            ).Skip((paginacionDTO.GetNroPagina() - 1) * paginacionDTO.GetNroFilas()).Take(paginacionDTO.GetNroFilas()).ToList();
                }
            }
            else
            {
                salida = lista.Skip((paginacionDTO.GetNroPagina() - 1) * paginacionDTO.GetNroFilas()).Take(paginacionDTO.GetNroFilas()).ToList();
            }
        }
        else
        {
            salida = lista;
        }


        return salida;
    }

    public static DataTable PaginarDataTable(DataTable dt, PaginacionDTO paginacionDTO, out int nroRegistros, string ordenDefault = "")
    {
        DataTable salida = new DataTable();

        nroRegistros = dt.Rows.Count;
        if (paginacionDTO.HabilitarPaginacion == true)
        {
            bool hayorden = false;
            if (paginacionDTO.sidx != null)
                if (paginacionDTO.sidx.Length > 0)
                    hayorden = true;
            if (!hayorden)
            {
                paginacionDTO.sidx = ordenDefault;
            }

            string orden = paginacionDTO.GetOrdenamiento().Trim();
            if (orden.Length > 0)
            {
                string sortfield = orden.Split(' ')[0].Trim();
                string sortExpression = orden.Split(' ')[1].ToUpper().Trim();

                DataView dv = dt.DefaultView;
                dv.Sort = sortfield + " " + sortExpression;
                salida = dv.ToTable();
                salida = salida.AsEnumerable().Skip((paginacionDTO.GetNroPagina() - 1) * paginacionDTO.GetNroFilas()).Take(paginacionDTO.GetNroFilas()).CopyToDataTable();
                salida.Columns.RemoveAt(salida.Columns.Count - 1);
            }
            else
            {
                salida = dt;
                //salida = lista.Skip((paginacionDTO.GetNroPagina() - 1) * paginacionDTO.GetNroFilas()).Take(paginacionDTO.GetNroFilas()).ToList();
            }
        }
        else
        {
            salida = dt;
        }

        return salida;
    }
}

