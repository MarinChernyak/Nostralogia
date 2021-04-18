using Nostralogia2._1.Common;
using Nostralogia2._1.SMAuthorization;
using Nostralogia2._1.SMParamKeeper;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using SMDataContracts;
using SMGeoDataContracts;
using CommonData;

namespace Nostralogia2._1.Models.Authentification
{

    public class ADUsers 
    {
        public List<UserData> GetUsers()
        {
            return new List<UserData>();
        }
    }
    public class ADUser: BaseModelWithUserData
    {
        protected UserData _userdata;
        public UserData UserData
        {
            get {
                if (_userdata == null && HttpContext.Current.Session[Constants.SessionUserData] == null)
                {
                    _userdata = new UserData();
                    _userdata.cityData = new SMGeoDataContracts.CityData();
                    _userdata.cityData.IDCity = 48;
                    _userdata.cityData.CountryData = new SMGeoDataContracts.CountryData();
                    _userdata.cityData.CountryData.CountryID = 0;
                    _userdata.cityData.StateRegionData = new SMGeoDataContracts.StateRegionData();
                    _userdata.cityData.StateRegionData.StateRegionID = 0;
                    _userdata.UserRoleData = new UserRole();
                    _userdata.UserRoleData.RoleID = 23;
                    _userdata.UserRoleData.AppID = Constants.AppID;

                    HttpContext.Current.Session[Constants.SessionUserData] = _userdata;
                }
                else if (_userdata==null && HttpContext.Current.Session[Constants.SessionUserData] != null)
                {
                    _userdata = (UserData)HttpContext.Current.Session[Constants.SessionUserData];
                }

                return _userdata; }
            set { _userdata = value; }
        }


        public virtual int CreateUserData()
        {
            int ID = 0;

            using (SMAuthorization.SMAuthorizationServClient serv = new SMAuthorization.SMAuthorizationServClient())
            {

                ErrorContainer[] err = serv.CreateNewUser(_userdata, out ID);
                if( err == null || err.Length == 0 || (err.Length == 1 && err[0].ErrorCode == ErrorCode.SMA_NOERRORS))
                {
                    //ID = Convert.ToInt32(uid);
                    HttpContext.Current.Session[Constants.UserID] = ID;
                }
               
            }

            return ID;
        }
        protected bool SetSessionKey()
        {
            bool bRez = true;
            if (HttpContext.Current.Session[Constants.SessionID] == null)
            {
                using (Nostralogia2._1.SMParamKeeper.SMParamKeeperServClient serv = new Nostralogia2._1.SMParamKeeper.SMParamKeeperServClient())
                {
                    PassGenerator passgen = new PassGenerator();
                    passgen.Numbers = true;
                    passgen.NumberSymbols = Constants.LengthSalt;
                    passgen.SmallLetters = true;
                    passgen.CapitalsLetters = true;
                    passgen.SpecialSymbols = true;
                    passgen.Generate();
                    String salt = passgen.Pass;
                    HttpContext.Current.Session[Constants.SessionSalt] = salt;

                    passgen.NumberSymbols = Constants.LengthPassphrase;
                    passgen.Generate();
                    String pass = passgen.Pass;
                    HttpContext.Current.Session[Constants.SessionPass] = pass;

                    DateTime dt = DateTime.Now.AddHours(24);
                    try
                    {
                        serv.SetSessionKey(ADUtilities.GetSessionGUID(), salt, pass, String.Format("{0}-{1}-{2}", dt.Year, dt.Month, dt.Day));
                    }
                    catch(Exception ex)
                    {
                        bRez = false;
                        FormatAndLogMessage("SetSessionKey", ex.Message);
                    }
                }
            }
            return bRez;
        }

        public virtual bool SaveUserData()
        {
            using (SMAuthorization.SMAuthorizationServClient serv = new SMAuthorization.SMAuthorizationServClient())
            {
                Errors = serv.UpdateUserData(_userdata).ToList();
            }

            return IsErrorsExist();
        }
    }

    //UserData ud = new UserData();

    //ud.UserName = "VPup";
    //ud.auxParam1 = "Test2";
    //ud.cityData = new CityData();
    //ud.cityData.IDCity = 48;
    //ud.cityData.CountryData = new CountryData();
    //ud.cityData.CountryData.CountryID = 0;
    //ud.cityData.StateRegionData = new StateRegionData();
    //ud.cityData.StateRegionData.StateRegionID = 0;
    //ud.Email = "Test@yahoo.com";
    //ud.LanguageID = 0;
    //ud.UserRoleData = new UserRole();
    //ud.UserRoleData.RoleID = 23;
    //ud.UserRoleData.AppID = 11;
}