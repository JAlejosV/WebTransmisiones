using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace TRAMARSA.AGMA.ACUERDOCOMERCIAL.Filters
{
    public class ChildActionOutputCacheAttribute : OutputCacheAttribute
    {
        public ChildActionOutputCacheAttribute(string cacheProfile)
        {
            var settings = (OutputCacheSettingsSection)WebConfigurationManager.GetSection("system.web/caching/outputCacheSettings");
            var profile = settings.OutputCacheProfiles[cacheProfile];
            Duration = profile.Duration;
            VaryByParam = profile.VaryByParam;
            VaryByCustom = profile.VaryByCustom;
        }
    }
}