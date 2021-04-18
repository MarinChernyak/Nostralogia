using CommonData;
using Nostralogia2._1.Common;
using Nostralogia2._1.Models;
using Nostralogia2._1.Models.Authentification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models
{
    public class HomeModel:BaseModel
    {
        public HomeModel()
        {
            SMEncryption.SMRijndaelEncryption encryptconst = new SMEncryption.SMRijndaelEncryption(Constants.SALT, Constants.PASS_PHRASE);
            HttpCookie cookie = HttpContext.Current.Request.Cookies[Constants.CoockiesUser];
            if (cookie != null)
            {
                String UserName = cookie[Constants.CoockiesUName];
                String Pass = cookie[Constants.CoockiesUPass];
                if (!String.IsNullOrEmpty(UserName) && !String.IsNullOrEmpty(Pass))
                {
                    UserName = encryptconst.Decrypt(UserName);
                    Pass = encryptconst.Decrypt(Pass);

                    LogInModel login = new LogInModel();
                    login.RememberMe = true;
                    login.LogIn(UserName, Pass);
                }
            }
        }
    }
}