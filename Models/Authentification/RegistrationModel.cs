using CommonData;
using Nostralogia2._1.Common;
using SMDataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Models.Authentification
{
    public class RegistrationModel : ADUser
    {
        public String errUserName { get; set; }
        public String errPassword { get; set; }
        public String errConfPassword { get; set; }
        public String errMsg { get; set; }
        public String errEmail { get; set; }
        public String errFName { get; set; }
        public String errLName { get; set; }

        
        public RegistrationModel()
        {
            //InitEntities();

        }
        public RegistrationModel(int id)
        {
            if (id > 0)
            {
                using (SMAuthorization.SMAuthorizationServClient serv = new SMAuthorization.SMAuthorizationServClient())
                {
                   UserData= serv.getUserDataByID(id, Constants.AppID, 0);
                }
                
             }
            InitLanguages();
        }
        protected void InitLanguages()
        {
            _laguages = Common.ADUtilities.getLanguages();

        }
        protected List<SelectListItem> _laguages;
        public List<SelectListItem> Laguages { get { return _laguages; } }
     }
}