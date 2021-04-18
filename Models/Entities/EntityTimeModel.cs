using Nostralogia2._1.Models.Calendar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models.Entities
{
    public class EntityTimeModel: EntityBaseModel
    {
        private TimeModel _time;
        public TimeModel Time
        {
            get
            {
                return _time;
            }
        }

        public EntityTimeModel( String entityLabel, TimeModel time, bool isEnabledForEdit = true)
            : base( entityLabel, "", isEnabledForEdit)
        {
            _idCtrl = String.Format("TimeEntity_{0}", _entityIndex);
            _time = time;
        }
    }
}