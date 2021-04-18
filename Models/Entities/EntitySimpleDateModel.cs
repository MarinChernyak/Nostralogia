using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sadalmelik3.Models.Calendar;

namespace Sadalmelik3.Models.Entities
{
    public class EntitySimpleDateModel :EntityBaseModel
    {
        private SimpleCalendarModel _calendar;
        public SimpleCalendarModel SimpleDate
        {
            get
            {
                return _calendar;
            }
        }
        public String GetDivCalendarID()
        {
            return String.Format("iddivCal_{0}", GetIDEntity());

        }
        public EntitySimpleDateModel(String entityname, String entityLabel, SimpleCalendarModel calendar, bool isEnabledForEdit = true)
            : base(entityname, entityLabel, "", isEnabledForEdit)
        {
            _calendar = calendar;
        }
    }
    public class EntitySimpleDateTimeModel : EntityBaseModel
    {
        private SimpleCalendarTimeModel _calendar;
        public SimpleCalendarTimeModel SimpleDateTime
        {
            get
            {
                return _calendar;
            }
        }
        public String GetDivCalendarID()
        {
            return String.Format("iddivCal_{0}", GetIDEntity());

        }
        public EntitySimpleDateTimeModel(String entityname, String entityLabel, SimpleCalendarTimeModel calendar, bool isEnabledForEdit = true)
            : base(entityname, entityLabel, "", isEnabledForEdit)
        {
            _calendar = calendar;
        }
    }
}