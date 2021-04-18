
using Nostralogia2._1.Common;
using Nostralogia2._1.Models;
using Nostralogia2._1.NostraDataServ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2.Models.DataWorks
{
    public class HystoricalRecords : BaseModelWithUserData
    {
        private HistoricalEvent[] _histData;

        public HistoricalEvent[] HistorycalDataCollection
        {
            get
            {
                if (_histData == null)
                    InitCollection();
                return _histData;
            }
        }

        public String GetEventType(HistoricalEvent hevent)
        {
            String st = String.Empty;
            if (hevent.EventKeywords != null && hevent.EventKeywords.Length >0)
            {
                foreach (KeyWord kw in hevent.EventKeywords)
                {
                    st = String.Format("{0},{1}", st, kw.KeyWordDescription);
                }
                st = st.Substring(1, st.Length - 1);
            }
            return st;
        }
        public String GetAverageDate(HistoricalEvent hevent)
        {
            DateTime dt = ADUtilities.GetAverageDate(hevent);

            return String.Format("{0}/{1}/{2}", dt.Day, dt.Month, dt.Year);
        }
        private void InitCollection()
        {
            using (NostraDataServClient serv = new NostraDataServClient())
            {
                _histData = serv.GetLastHistoricalDataCollection(10, Lang);
            }
        }
    }
}