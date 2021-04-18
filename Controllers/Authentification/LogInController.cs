
using CommonData;
using Nostralogia2._1.Common;
using Nostralogia2._1.Models.Authentification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Controllers.Authentification
{
    public class LogInController : Controller
    {
        //

        public ActionResult LogIn()
        {

            LogInModel _model = new LogInModel();
            return View("~/Views/Account/LogIn.cshtml", _model);
        }

       //
        // POST: /LogIn/Create

        [HttpPost]
        public ActionResult LogIn(LogInModel model)
        {

            try
            {
                bool brez = true;
                if (String.IsNullOrEmpty(model.UserData.UserName))
                {
                    model.errUserName = "Username cannot be empty!";
                    brez = false;
                }
                if (String.IsNullOrEmpty(model.UserData.auxParam1))
                {
                    model.errPassword = "Password cannot be empty!";
                    brez = false;
                }
                if (brez)
                {
                    brez=model.LogIn(model.UserData.UserName, model.UserData.auxParam1);
                }
                
                if(brez)
                   return RedirectToAction("Index", "Home");
                else                       
                   return View("~/Views/Account/LogIn.cshtml", model);
                
            }
            catch (Exception ex)
            {
                model.AddError(ex.Message);
                return View("~/Views/Account/LogIn.cshtml", model);
            }

        }

        //


        public ActionResult LogOut()
        {
            Session[Constants.SessionUserData] = null;
            HttpCookie cookie = HttpContext.Request.Cookies[Constants.CoockiesUser];
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Response.SetCookie(cookie);
            }
            return RedirectToAction("Index", "Home");
        }

        //
        // POST: /LogIn/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        [HttpPost]
        public ActionResult ResetPassword()
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
