using Nostralogia2._1.Common;
using Nostralogia2._1.Models.Geo;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Nostralogia2._1.SMGeo;
using SMGeoDataContracts;

namespace Nostralogia2._1.Controllers.UserControls
{
    public class EventPlaceController : Controller
    {
        //
        // GET: /EventPlace/

        public ActionResult EventPlaceMain(int idcity)
        {
            GeoPlaceCollections model = new GeoPlaceCollections(idcity);
            return PartialView(model);
        }


        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /EventPlace/Create
        [HttpPost]
        public JsonResult StateChangedValue()
        {
            string json;

            var objectToSerialize = new RootJCollectionObject();
            try
            {
                String geocat = "S";
                objectToSerialize.items = new List<JsonCollection>();
                JsonCollection lstCities = new JsonCollection() { Name = "Cities", items = new List<SelectListItem>() };
                using (var reader = new StreamReader(Request.InputStream))
                {
                    json = reader.ReadToEnd();
                }
                JObject jObject = JObject.Parse(json);
                int idRef = 0;
                if (jObject["stateval"] != null)
                {
                    idRef = Convert.ToInt32(jObject["stateval"].ToString());
                    if(idRef==-1)
                    {
                        geocat = "C";
                        idRef = Convert.ToInt32(jObject["countryval"].ToString());
                    }
                }
                using (SMGeo.ServiceClient serv = new SMGeo.ServiceClient())
                {
                    CityData[] arrCities = serv.getCityList(idRef, geocat);

                    foreach (CityData cd in arrCities)
                    {
                        lstCities.items.Add(new SelectListItem { Value = cd.IDCity.ToString(), Text = cd.CityName });
                    }
                    objectToSerialize.items.Add(lstCities);

                }
            }
            catch
            {

            }

            var jout = Json(objectToSerialize);
            return jout;
        }
        [HttpPost]
        public JsonResult CountryChangedValue()
        {
            string json;
            
            var objectToSerialize = new RootJCollectionObject();
            try
            {
                objectToSerialize.items = new List<JsonCollection>();
                JsonCollection lstCities = new JsonCollection() { Name = "Cities", items = new List<SelectListItem>() };
                JsonCollection lstStates = new JsonCollection() { Name = "States", items = new List<SelectListItem>() };
                using (var reader = new StreamReader(Request.InputStream))
                {
                    json = reader.ReadToEnd();
                }
                JObject jObject = JObject.Parse(json);
                int idCountry = 0;
                String geoCat = "C";
                CityData[] arrCities = null;
                if (jObject["countryval"] != null)
                {
                    idCountry = Convert.ToInt32(jObject["countryval"].ToString());

                }
                using (SMGeo.ServiceClient serv = new SMGeo.ServiceClient())
                {
                    
                    StateRegionData[] arrStates = serv.getStatesList(idCountry);
                    lstStates.items.Add(new SelectListItem { Value = ConstantsCommon.CmbNotSelected, Text = "Select one..." });
                    foreach (StateRegionData srd in arrStates)
                    {
                        lstStates.items.Add(new SelectListItem { Value = srd.StateRegionID.ToString(), Text = srd.StateRegionName });
                    }
                    arrCities = serv.getCityList(idCountry, geoCat);
                    foreach (CityData cd in arrCities)
                    {
                        lstCities.items.Add(new SelectListItem { Value = cd.IDCity.ToString(), Text = cd.CityName });
                    }
                    objectToSerialize.items.Add(lstCities);


                    objectToSerialize.items.Add(lstStates);
                }
            }
            catch
            {
            }
            var jout = Json(objectToSerialize);
            return jout;
         }
        [HttpPost]
        public ActionResult CreatePersonalRecord()
        {
            try
            {

            }
            catch
            {

            }
            return View();
        }

        //
        // GET: /EventPlace/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /EventPlace/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /EventPlace/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /EventPlace/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
