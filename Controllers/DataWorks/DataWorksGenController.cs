using Nostralogia2._1.NostraDataServ;
using Nostralogia2._1.Models.DataWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Nostralogia2.Models.DataWorks;

namespace Nostralogia2.Controllers.DataWorks
{
    public class DataWorksGenController : Controller
    {
        //
        // GET: /DataWorksGen/

        public ActionResult Index()
        {
            GeneralDataWorking model = new GeneralDataWorking();

            return View(model);
        }

    }
}
