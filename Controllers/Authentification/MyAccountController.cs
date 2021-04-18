using CommonData;
using Nostralogia2._1.Common;
using Nostralogia2._1.Models.Authentification;
using SMDataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Controllers.Authentification
{
    public class MyAccountController : Controller
    {
        public ActionResult Index()
        {
            if (Session[Constants.SessionUserData]!=null)
            {
                UserData ud = (UserData)Session[Constants.SessionUserData];
                if (ud != null)
                {
                    RegistrationModel model = new RegistrationModel(ud.UID);
                    return View("~/Views/Account/MyAccountView.cshtml", model);
                }
            }
            return  View("~/Views/Account/Login.cshtml",new LogInModel());
        }
        
    }
}
