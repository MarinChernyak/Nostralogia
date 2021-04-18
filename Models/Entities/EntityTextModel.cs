using Nostralogia2._1.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models.Entities
{
    
    public class EntityTextModel:EntityBaseModel
    {
        //private string p1;
        //private string p2;
        //private string p3;


        public EntityTextModel(String entityLabel, String entityData = "", bool isEnabledForEdit = true)
            : base( entityLabel, entityData)
        {
            _idCtrl = String.Format("txtCtrlInEntity_{0}", _entityIndex);
        }


        public virtual String DisplayData
        {
            get
            {
                String outStr = _entitydata;
                if (outStr.Length > 100)
                {
                    outStr = String.Format("{0}...", _entitydata.Substring(0, 50));
                }
                return outStr;
            }
        }

   }
    public class EntityTextAreaModel : EntityTextModel
    {
        public int Columns { get; set; }
        public int Rows { get; set; }
        public override String DisplayData
        {
            get
            {
                String outStr=_entitydata;
                if (outStr.Length > 100)
                {
                    outStr = String.Format("{0}...",_entitydata.Substring(0, 100));
                }
                return outStr;
            }
        }
        public EntityTextAreaModel( String entityLabel, String entityData = "", bool isEnabledForEdit = true, int columns = 70, int rows = 20)
            :base(entityLabel,entityData,isEnabledForEdit)
        {
            _idCtrl = "txtAreaCtrlInEntity";
            Columns = columns;
            Rows = rows;
        }
    }
}