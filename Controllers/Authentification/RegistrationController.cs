using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Nostralogia2._1.Models.Authentification;
using Nostralogia2._1.Common;
using SMDataContracts;
using CommonData;

namespace Nostralogia2._1.Controllers.Registration
{
    public class RegistrationController : Controller
    {
        //
        // GET: /REgistration/

        //
        // GET: /REgistration/Details/5

        public ActionResult ShowUser()
        {
            if (Session[Constants.SessionUserData]!=null)
            {
                UserData ud = (UserData)Session[Constants.SessionUserData];
                if (ud != null)
                {
                    RegistrationModel model = new RegistrationModel(ud.UID);
                    return View("~/Views/Account/Register.cshtml", model);
                }
            }
            return View("~/Views/Account/Register.cshtml", new RegistrationModel());
        }

        //
        // GET: /REgistration/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /REgistration/Create

        [HttpPost]
        public ActionResult Create(RegistrationModel model)
        {
            try
            {
                int IDUser = model.CreateUserData();
                if (IDUser > 0)
                {
                    Session[Constants.UserID] = IDUser;
                    return RedirectToAction("ShowUser", new { id = IDUser });
                }
            }
            catch
            {
                
            }
            return View();
        }

        //
        // GET: /REgistration/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /REgistration/Edit/5

        [HttpPost]
        public ActionResult SaveUserData(FormCollection model)
        {
            //if (ModelState.IsValid && model != null && model.ModelUserData.UserData != null)
            //{
            //    if (model.SaveUserData())
            //    {
            //        return RedirectToAction("Index", "Home");
            //    }
            //}
            return RedirectToAction("Index", "Home");            
        }

        //
        // POST: /REgistration/Delete/5

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
    }
}
