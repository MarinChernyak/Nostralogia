using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models.Entities
{
    public class EntityEmailModel : EntityTextModel
    {
        public String ErrorMessage { get { return "Entered email is not valid!"; } }

        public EntityEmailModel( String entityLabel, String entityData = "", bool isEnabledForEdit = true)
            : base( entityLabel, entityData, isEnabledForEdit)
        {
            _idCtrl = String.Format("EmailEntity_{0}", _entityIndex);
        }
    }
}