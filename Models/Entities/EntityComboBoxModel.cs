using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Models.Entities
{
    public class EntityComboBoxModel : EntityBaseModel
    {
        protected List<SelectListItem> _lstData;
        public List<SelectListItem> LstData
        { get { return _lstData; } }

        public EntityComboBoxModel(List<SelectListItem> lst, String entityLabel, String entityData = "", bool isEnabledForEdit = true)
            : base( entityLabel, entityData)
        {
            _idCtrl = String.Format("cmbCtrlEntity_{0}", _entityIndex);
            _lstData = lst;
            if(lst!=null)
            {
                SelectListItem item = lst.Find(x => x.Selected == true);
                if (item != null)
                {
                    _entitydata = item.Text;
                }
                else if (!String.IsNullOrEmpty(entityData))
                {
                    SelectListItem item2 = lst.Find(x => x.Text == entityData);
                    item2.Selected = true;
                }
            }
        }
    }
}