using Nostralogia2._1.Common;
using Nostralogia2._1.SMAuthorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SMDataContracts;
using Nostralogia2._1.Models.Authentification;
using CommonData;


namespace Nostralogia2._1.Models.Authentification
{
    public class LogInModel : ADUser
    {
        public String errUserName { get; set; }
        public String errPassword { get; set; }
        public String errMsg { get; set; }

       public bool RememberMe { get; set; }
        public LogInModel()
        {
            //errUserName = String.Empty;
            //errPassword = String.Empty;
        } 
        public bool LogIn(String UserName, String Password)
        {
            _userdata = null;
            bool brez = false;
            if (SetSessionKey())
            {
                using (Nostralogia2._1.SMAuthorization.SMAuthorizationServClient serv = new SMAuthorizationServClient())
                {
                    String pass = HttpContext.Current.Session[Constants.SessionPass].ToString();
                    String salt = HttpContext.Current.Session[Constants.SessionSalt].ToString();
                    SMEncryption.SMRijndaelEncryption encrypt = new SMEncryption.SMRijndaelEncryption(salt, pass);
                    String encPass = encrypt.Encrypt(Password);
                    String encUName = encrypt.Encrypt(UserName);
                    String SessionID = HttpContext.Current.Session[Constants.SessionID].ToString();
                    
                    _userdata = serv.LogInSecure(Constants.AppID, SessionID, encUName, encPass);
                    
                    if (_userdata != null && (_userdata.Errors == null || (_userdata.Errors != null && _userdata.Errors.Count == 0) || (_userdata.Errors.Count == 1 && _userdata.Errors[0].ErrorCode ==ErrorCode.SMA_NOERRORS)) &&
                        _userdata.IsActive &&  _userdata.UserRoleData!=null)
                        brez = true;
                    else
                        errMsg = "A username and/or password in not correct. Please try again";
                    if (brez )
                    {
                        if (RememberMe)
                        {
                            SMEncryption.SMRijndaelEncryption encryptconst = new SMEncryption.SMRijndaelEncryption(Constants.SALT, Constants.PASS_PHRASE);
                            HttpCookie cookie = HttpContext.Current.Response.Cookies[Constants.CoockiesUser];
                            if (cookie == null)
                            {
                                cookie = new HttpCookie(Constants.CoockiesUser);
                            }
                            cookie.Expires = DateTime.Now.AddDays(10);
                            cookie.Values[Constants.CoockiesUName] = encryptconst.Encrypt(UserName);
                            cookie.Values[Constants.CoockiesUPass] = encryptconst.Encrypt(Password);
                            cookie.Values[Constants.CoockiesLevel] = encryptconst.Encrypt(_userdata.UserRoleData.AccessLevel.ToString());
                            cookie.Values[Constants.CoockiesLanguage] = encryptconst.Encrypt(_userdata.LanguageID.ToString());
                            HttpContext.Current.Response.SetCookie(cookie);

                        }
                        if (!String.IsNullOrEmpty(_userdata.FName))
                            _userdata.FName = encrypt.Decrypt(_userdata.FName);
                        if (!String.IsNullOrEmpty(_userdata.LName))
                            _userdata.LName = encrypt.Decrypt(_userdata.LName);
                        if (!String.IsNullOrEmpty(_userdata.MName))
                            _userdata.MName = encrypt.Decrypt(_userdata.MName);
                        if (!String.IsNullOrEmpty(_userdata.DOB))
                            _userdata.DOB = encrypt.Decrypt(_userdata.DOB);
     
                        HttpContext.Current.Session[Constants.SessionUserData] = _userdata;

                    }

                }
            }
            return brez;
        }
    }
}