using Nostralogia2._1.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SMDataContracts;
using CommonData;

namespace Nostralogia2._1.Models
{
    public abstract class BaseModelWithUserData : BaseModel
    {
        public int Lang
        {
            get
            {
                int iLang = 0;
                UserData ud = (UserData)HttpContext.Current.Session[Constants.SessionUserData];
                if (ud != null)
                {
                    iLang = ud.LanguageID;
                }
                return iLang;
            }
        }
        public int UserID
        {
            get
            {
                int uid = 0;
                UserData ud = (UserData)HttpContext.Current.Session[Constants.SessionUserData];
                if (ud != null)
                {
                    uid = ud.UID;
                }
                return uid;
                //return 79; //JUST FOR DEVELOPEMNT!!!
            }
        }
        public int Level
        {
            get
            {
                int iLevel = 0;
                UserData ud = (UserData)HttpContext.Current.Session[Constants.SessionUserData];
                if (ud != null)
                {
                    iLevel = ud.UserRoleData.AccessLevel;
                }
                return iLevel;
            }
        }
        virtual public bool IsEnabledForEdit
        {

            get
            {
                bool bEnabled = true;
                bEnabled = Level == (int)Constants.ACESS_LEVEL.AL_ADMIN;

                return bEnabled;
            }
        }
    }
    public abstract class BaseModel :Object
    {
        private LogMaster _logmaster;
        protected LogMaster LM
        {
            get
            {
                if (_logmaster == null)
                    _logmaster = new LogMaster();

                return _logmaster;
            }
        }


        protected List<ErrorContainer> Errors { get; set; }
        //private Dictionary<String, String> _stringsTable;

        public BaseModel()
        {
            //CreateStringsTable();
        }
        //protected void CreateStringsTable()
        //{            
        //    //UpdateDictionary(CreateListIDS());
        //}
        public bool IsErrorsExist()
        {
            bool brez = false;
            if (Errors != null && (Errors.Count >1 || (Errors.Count == 1 && Errors[0].ErrorCode != ErrorCode.SMA_NOERRORS)))
                brez=true;
            return brez;
        }
        

        #region MESSAGING
        public String GetFormatedErrorHTML()
        {
            String sOUT = String.Empty;
            if (IsErrorsExist())
            {
                sOUT = "<ul>";
                foreach (ErrorContainer err in Errors)
                {
                    sOUT = String.Format("{0}<li class=\"Nostra_Error\">{1}</li>", sOUT, err.ErrorMessage);
                }
                sOUT = String.Format("{0}</ul>", sOUT);
            }
            return sOUT;
        }

        public void AddError(String msg, ErrorCode code = ErrorCode.SMA_UNDEFINED)
        {
            if (Errors == null)
                Errors = new List<ErrorContainer>();

            ErrorContainer err = new ErrorContainer();
            err.ErrorMessage=msg;
            err.ErrorCode =code;
            Errors.Add(err);
        }


        protected void FormatAndLogMessage(String sFunction, String sMsg)
        {
            String smsg = String.Format("{0}   {1:dd/MM/yy HH:mm}--> {2}", sFunction, DateTime.Now, sMsg);
            LM.SetLog(smsg);
        }
        #endregion
        //#region LOCALIZATION

        //protected Dictionary<String, String> StringsTable
        //{
        //    get
        //    {
        //        if (_stringsTable == null)
        //            _stringsTable = new Dictionary<string, string>();
        //        return _stringsTable;
        //    }

        //}
        //protected virtual List<string> CreateListIDS()
        //{
        //    return  new List<string>();
        //}
        //public String GetString(String IDS)
        //{
        //    String sOut = "no string";
        //    if (StringsTable.ContainsKey(IDS))
        //        sOut = _stringsTable[IDS];
        //    return sOut;

        //}
        ////protected void UpdateDictionary(List<String> lstIDS)
        ////{

        ////    StringNode[] arr = null;
        ////    if (lstIDS.Count > 0)
        ////    {
        ////        using (SMLocalization.LocalizationServiceClient serv = new SMLocalization.LocalizationServiceClient())
        ////        {
        ////            arr = serv.getStringsCollection(lstIDS.ToArray(), Lang, true);
        ////        }
        ////        if (arr != null && arr.Length > 0)
        ////        {
        ////            foreach (StringNode sn in arr)
        ////            {
        ////                StringsTable[sn.IDStr] = sn.Text;
        ////            }
        ////        }
        ////    }
        ////}
        //protected virtual void UpdateSpecialStrings()
        //{

        //}
        //public virtual int GetUserRights()
        //{
        //    return (int)Constants.USERS_RIGHTS.UR_CREATE;
        //}
        //#endregion


    }
}