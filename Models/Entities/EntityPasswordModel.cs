using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models.Entities
{
    public class EntityPasswordModel : EntityTextModel
    {

        public String EntityLabel2{ get {return "Change Password";} }
        public String EntityLabelConfirm { get { return "Confirm Password"; } }

        public String ErrorMessage { get { return "Entered passwords do not match!"; } }

        public EntityPasswordModel( String entityLabel, String entityData = "", bool isEnabledForEdit = true)
            : base( entityLabel, entityData)
        {
            _idCtrl = String.Format("PasswordEntity_{0}", _entityIndex);
        }

        public string ConfirmPass { get; set; }

    }
}