using Nostralogia2._1.Models.Geo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using Nostralogia2._1.Models.Geo;

namespace Nostralogia2._1.Models.Entities
{
    public class EntityGeoPlaceModel : EntityBaseModel
    {
        public GeoPlaceCollections GeoModel { get; set; }
        public EntityGeoPlaceModel( String entityLabel, int IDPlace, bool isEnabledForEdit = true)
            : base(entityLabel, "", isEnabledForEdit)
        {
            _idCtrl = String.Format("geoEntity_{0}", _entityIndex);
            GeoModel = new GeoPlaceCollections(IDPlace);
            _entitydata = GeoModel.ToString();
        }
    }
}