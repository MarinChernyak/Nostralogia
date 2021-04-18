using Nostralogia2._1.NostraDataServ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;


namespace Nostralogia2._1.Common
{
    public class ADUtilities
    {
        public static String GetSessionGUID()
        {
            String SessionID = String.Empty;
            if (HttpContext.Current.Session[CommonData.Constants.SessionID] != null)
            {
                SessionID = HttpContext.Current.Session[CommonData.Constants.SessionID].ToString();
            }
            else
            {
                Guid guid = Guid.NewGuid();
                SessionID = guid.ToString();
                HttpContext.Current.Session.Add(CommonData.Constants.SessionID, SessionID);
            }
            return SessionID;
        }
        public static DateTime GetAverageDate(DateTime dt1, DateTime dt2)
        {
            TimeSpan ts = dt1 - dt2;
            return dt2.AddSeconds(ts.Seconds / 2); 
        }
        public static DateTime GetAverageDate(HistoricalEvent he)
        {
            DateTime dt1 = new DateTime(he.Events_Year_from, he.Events_Month_from, he.Events_Day_from, he.Events_H_from, he.Events_M_from, 0);
            DateTime dt2 = new DateTime(he.Events_Year_to, he.Events_Month_to, he.Events_Day_to, he.Events_H_to, he.Events_M_to, 0);
            return GetAverageDate(dt1, dt2);
        }
        public static List<SelectListItem> getLanguages()
        {
            List<SelectListItem> lst = new List<SelectListItem>();
            lst.Add(new SelectListItem(){
                Text="English",
                Value="0",
                Selected=true
            });
            lst.Add(new SelectListItem(){
                Text="Русский",
                Value="2"
            });

            return lst;
        }
        public static String getLanguageDesc(int ID)
        {
            String lang = "English";
            if (ID==2)
            {
               lang = "Русский";
            }
            return lang; 
        }
    }
  
}