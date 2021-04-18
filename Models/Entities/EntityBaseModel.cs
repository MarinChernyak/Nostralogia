using Nostralogia2._1.Common;
using Nostralogia2._1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models.Entities
{
    public class EntityBaseModel : BaseModel
    {

        protected String _entitylabel;
        public String EntityLabel { get { return String.Format("{0}:", _entitylabel); } }
        private bool _isEnabledForEdit;
        public  bool IsEnabledForEdit { get { return _isEnabledForEdit; } }
        protected String _entitydata;

        protected int _entityIndex;
        public int EntityIndex { get { return _entityIndex; } }

        public String IdEntity { get { return String.Format("idEntity_{0}",_entityIndex); } }
        public String IdDivCtrl { get { return String.Format("iddivCtrl_{0}", _entityIndex); } }
        public String idimgEdit { get { return String.Format("idimgEdit_{0}", _entityIndex); } }
        public String idimgCancel { get { return String.Format("idimgCancel_{0}", _entityIndex); } }
        public String idHiddenValue { get { return String.Format("idHiddenValue_{0}", _entityIndex); } }

        protected String _idCtrl;
        public String IdCtrl {get {return _idCtrl;}}

        public String EntityData
        {
            get { return _entitydata; }
        }

        public EntityBaseModel(String entityLabel, String entityData = "", bool isEnabledForEdit = true)
        {
            _entityIndex = Constants.Counter;
            _isEnabledForEdit = isEnabledForEdit;
            _entitylabel = entityLabel;
            _entitydata = entityData;
        }
 
    }
}