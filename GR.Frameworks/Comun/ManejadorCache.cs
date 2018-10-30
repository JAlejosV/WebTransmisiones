using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Practices.EnterpriseLibrary.Caching;
using System.Web;
using Microsoft.Practices.EnterpriseLibrary.Caching.Expirations;
using System.Configuration;

namespace GR.Frameworks
{
    /// <summary>
    /// Clase que centraliza el manejo de Caching utilizando el Enterprise Library Caching Application Block  
    /// </summary>
    public class ManejadorCache
    {
        /// <summary>
        /// Obtiene un Valor de Cache del tipo T
        /// </summary>
        /// <typeparam name="T">Tipo de dato del valor obtenido de cache</typeparam>
        /// <param name="keyCache">Key del cache que almacena el valor a obtener</param>
        /// <returns>Valor de Cache del tipo T</returns>
        public T ObtenerValorCache<T>(string keyCache)
        {
            ICacheManager cacheManager = CacheFactory.GetCacheManager();

            object valorCache = null;

            if (cacheManager.Contains(keyCache))
            {
                valorCache = cacheManager.GetData(keyCache);
            }
            return (T)valorCache;  
        }

        /// <summary>
        /// Inserta un valor en cache
        /// </summary>
        /// <param name="keyCache">Key del cache donde se insertará el valor</param>
        /// <param name="valorCache">Valor a insertar en cache</param>
        public void InsertarValorCache(string keyCache, object valorCache/*,int expiracionHoras*/)
        {
            ICacheManager cacheManager = CacheFactory.GetCacheManager();
            int expiracionCacheHoras = Convert.ToInt32(ConfigurationManager.AppSettings["ExpiracionCacheHoras"]);
            if (expiracionCacheHoras == 0)
                expiracionCacheHoras++;
            cacheManager.Add(keyCache, valorCache, CacheItemPriority.Normal, null, new SlidingTime(TimeSpan.FromHours(expiracionCacheHoras)));
              
        }

        /// <summary>
        /// Elimina un valor de cache
        /// </summary>
        /// <param name="keyCache">Key del cache de donde se eliminará el valor</param>
        public void EliminarValorCache(string keyCache)
        {
            var cacheManager = CacheFactory.GetCacheManager();
            cacheManager.Remove(keyCache);
        }
    }
}
