using CommonData;
using Nostralogia2._1.Common;
using Nostralogia2._1.NostraDataServ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Models.DataWorks
{
    public abstract class SelectedListModel : BaseModel
    {
        public String SelectedItemText { get; set; }

        //protected int _idSelected;
        public int IdSelected { get; set; }
        protected List<SelectListItem> _lstSelData;
        public List<SelectListItem> LstSelectedData
        {
            get
            {
                if (_lstSelData == null)
                    InitSelectedData();
                return _lstSelData;
            }

        }
        public SelectedListModel(int idselecteditem= Constants.ComboNotSelected)
        {
            IdSelected = idselecteditem;
            
        }
        protected void UpdateWithZeroItem()
        {
            _lstSelData.Insert(0,new SelectListItem() { Text = "Select one...", Value = ConstantsCommon.CmbNotSelected});
        }
        virtual protected void InitSelectedData()
        {
            _lstSelData = new List<SelectListItem>();
            if (IdSelected == Constants.ComboNotSelected)
            {
                UpdateWithZeroItem();
            }
        }
        public void SetSelection(int ideselection)
        {
            IdSelected = ideselection;
            SelectListItem item = LstSelectedData.Find(x => x.Selected == true);
            if (item != null)
                item.Selected = false;
            item = LstSelectedData.Find(x => x.Value == IdSelected.ToString());
            if (item != null)
                item.Selected = true;

        }
 
    }
}