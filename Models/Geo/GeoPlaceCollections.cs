using CommonData;
using Nostralogia2._1.Common;
using Nostralogia2._1.Models.DataWorks;
//using Nostralogia2._1.Models.DataWorks;
using Nostralogia2._1.SMGeo;
using SMGeoDataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Models.Geo
{
    public class GeoPlaceCollections : BaseModel
    {
        private int _idCity;
        private CitiesCollectionModel _cities;
        private StatesRegionsCollectionModel _states;
        private CountriesCollectionModel _countries;

        public CitiesCollectionModel Cities { get { return _cities; } }
        public StatesRegionsCollectionModel States { get { return _states; } }
        public CountriesCollectionModel Countries { get { return _countries; } }

        public override string ToString()
        {
            String outStr = String.Empty;
            String sCountry = Countries.SelectedItemText;
            if (!String.IsNullOrEmpty(Cities.SelectedItemText))
            {
                outStr = Cities.SelectedItemText;
                if (!String.IsNullOrEmpty(sCountry))
                {
                    outStr = String.Format("{0}, {1}", outStr, sCountry);
                }
            }
            SelectListItem sli = States.LstSelectedData.Find(x => x.Selected == true);
            bool bShow = false;
            if (sli != null)
            {
                bShow = !String.IsNullOrEmpty(outStr) && sli.Value!="0";
            }
            if (!String.IsNullOrEmpty(States.SelectedItemText) && bShow)
            {
                outStr = String.Format("{0} ({1})", outStr, States.SelectedItemText);                
            }
            if (String.IsNullOrEmpty(outStr))
                outStr = "Unknown";
            return outStr;
        }
        //private String _cssBox;
        //public String cssBox
        //{
        //    get { return _cssBox; }
        //}
        //private String _cssMain;
        //public String cssMain
        //{
        //    get { return _cssMain; }
        //}
        //protected override List<String> CreateListIDS()
        //{
        //    //List<String> _lstIDS = base.CreateListIDS();
        //    //_lstIDS.Add("Nostra_LBL_ALL_CITIES");

        //    return _lstIDS;
        //}
        public void SetCountry(int idCountry)
        {
            if (_countries == null)
                _countries = new CountriesCollectionModel(idCountry);
            else
                _countries.SetSelection(idCountry);
            _states = new StatesRegionsCollectionModel(idCountry);
            _cities = new CitiesCollectionModel();
        }
        public GeoPlaceCollections(int IDCity)
        {
            if (IDCity > 0)
            {
                _idCity = IDCity;
                InitCityData(_idCity);

                //_cssBox =  "EP_BoxContainer_Edit";
                //_cssMain = "EP_Main_Edit";
            }
            else
            {
                _countries = new CountriesCollectionModel();
                _states = new StatesRegionsCollectionModel(0);
                _cities = new CitiesCollectionModel();
                //_cssBox = "EP_BoxContainer";
                //_cssMain = "EP_Main";

            }

        }
        public GeoPlaceCollections(int IDCountry, int IDState)
        {
            _countries = new CountriesCollectionModel(IDCountry);
            _states = new StatesRegionsCollectionModel(IDCountry, IDState);
            if(IDState==0)
                _cities = new CitiesCollectionModel("C",IDCountry);
            else
                _cities = new CitiesCollectionModel("S", IDState);
        }
        protected void InitCityData(int idCity)
        {
            if (idCity > 0)
            {
                CityData cd = null;
                try
                {
                    using (SMGeo.ServiceClient serv = new ServiceClient())
                    {
                        cd = serv.getCityData(idCity);
                        if (cd != null)
                        {
                            _countries = new CountriesCollectionModel(cd.CountryData.CountryID);
                            _states = new StatesRegionsCollectionModel(cd.CountryData.CountryID, cd.StateRegionData.StateRegionID);
                            if (cd.StateRegionData.StateRegionID > 0)
                                _cities = new CitiesCollectionModel("S", cd.StateRegionData.StateRegionID, cd.IDCity);
                            else
                                _cities = new CitiesCollectionModel("C", cd.CountryData.CountryID, cd.IDCity);                            
                        }
                    }
                }
                catch
                {

                }
            }
        }
    }

/*  GeoCategory may be just "C" - country or "S" - state
*   Default -> country
*/
    public class CitiesCollectionModel : SelectedListModel
    {
        private int _idRef; //country or state

        private String _geocat;
        public CitiesCollectionModel()
        {
            _lstSelData = new List<SelectListItem>();
        }
        public CitiesCollectionModel(String geocategory, int idRef, int IDCitySelect=0)
            :base(IDCitySelect)
        {
            _geocat = geocategory;
            if (_geocat != "C" && _geocat != "S")
                _geocat = "C";
            _idRef = idRef;
            InitSelectedData();
        }
        protected override void InitSelectedData()
        {
            base.InitSelectedData();
            if (_idRef > 0)
            {
                
                using (SMGeo.ServiceClient serv = new SMGeo.ServiceClient())
                {
                    CityData[] arData = serv.getCityList(_idRef, _geocat);
                    foreach (CityData sd in arData)
                    {
                        bool IsSelected = false;
                        if (sd.IDCity == IdSelected)
                        {
                            IsSelected = true;
                            SelectedItemText = sd.CityName;
                        }
                        _lstSelData.Add(new SelectListItem() { Value = sd.IDCity.ToString(), Text = sd.CityName, Selected = IsSelected });
                    }
                }
            }
        }
    }
    public class CountriesCollectionModel : SelectedListModel
    {
        public CountriesCollectionModel(int IDCountrySelect=Constants.ComboNotSelected)
            :base(IDCountrySelect)
        {
            InitSelectedData();
        }

        protected override void InitSelectedData()
        {
            base.InitSelectedData();
            using (SMGeo.ServiceClient serv = new SMGeo.ServiceClient())
            {
                CountryData[] arData = serv.GetCountriesList();

                foreach (CountryData sd in arData)
                {
                    bool IsSelected = false;
                    if (sd.CountryID == IdSelected)
                    {
                        IsSelected = true;
                        SelectedItemText = sd.CountryName;
                    }
                    _lstSelData.Add(new SelectListItem() { Value = sd.CountryID.ToString(), Text = sd.CountryName, Selected = IsSelected });
                }
            }
        }
    }
    public class StatesRegionsCollectionModel : SelectedListModel
    {
        private int _idSelect;
        private int _idCountry;
        public StatesRegionsCollectionModel(int idCountry,int IDSelect = 0)
        {
            _idCountry = idCountry;
            _idSelect = IDSelect;
            InitSelectedData();
        }

        protected override void InitSelectedData()
        {
            base.InitSelectedData();
            using (SMGeo.ServiceClient serv = new SMGeo.ServiceClient())
            {
                StateRegionData[] arData = serv.getStatesList(_idCountry);
                foreach (StateRegionData sd in arData)
                {
                    bool IsSelected = false;
                    if (sd.StateRegionID == _idSelect)
                    {
                        IsSelected = true;
                        SelectedItemText = sd.StateRegionName;
                    }
                    _lstSelData.Add(new SelectListItem() { Value = sd.StateRegionID.ToString(), Text = sd.StateRegionName, Selected = IsSelected });
                }
            }
        }
    }
}