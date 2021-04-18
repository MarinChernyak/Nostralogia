using Nostralogia2._1.Models.Calendar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models.Entities
{
    public class EntityDateModel : EntityBaseModel
    {
        //public CalendarModel(int year, int month, int day, String id = "cal1", String timestring = "12:00:00")
        private CalendarModel _calendar;
        public CalendarModel DOB
        {
            get
            {
                return _calendar;
            }
        }

        public EntityDateModel(String entityLabel, CalendarModel calendar, bool isEnabledForEdit = true)
            : base(entityLabel, String.Format("{0}/{1}/{2}\t{3}:{4}:{5}", calendar.Day, calendar.Month, calendar.Year, calendar.TM.Hour, calendar.TM.Minutes, calendar.TM.Seconds), isEnabledForEdit)
        {
            _calendar = new CalendarModel(calendar);
            _idCtrl = String.Format("DatelEntity_{0}", _entityIndex);
        }
    }
}