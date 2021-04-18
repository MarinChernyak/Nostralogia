using Nostralogia2._1.Models;
using Nostralogia2._1.Models.Authentification;
using SMDataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Controllers.Authentification
{
    public class ChangePasswordController : Controller
    {
        //
        // GET: /ChangePassword/

        //public ActionResult Index()
        //{
        //    LocalPasswordModel model = new LocalPasswordModel();
        //    return View("~/Views/Account/ChangePassword.cshtml", model);
        //}
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult SaveChangedPassword(LocalPasswordModel model)
        //{
        //    if (Session[Nostralogia2._1.Common.Constants.SessionUserData] != null)
        //    {
        //        UserData ud = (UserData)Session[Nostralogia2._1.Common.Constants.SessionUserData];
        //        if (ud != null && ud.UID > 0)
        //        {
        //            bool OldPassOK = model.CheckOldPassword(ud.UID);
        //            if (model.NewPassword.Length >= 6 && model.ConfirmPassword.Length >= 6 && model.NewPassword == model.ConfirmPassword)
        //            {
        //                if (model.ResetPassword(ud.UserName) == 1)
        //                {
        //                    RegistrationModel rmodel = new RegistrationModel(ud.UID);
        //                    return View("~/Views/Account/MyAccountView.cshtml", rmodel);
        //                }
        //            }
        //        }
        //    }
        //    return View();
        //}
    }
}
