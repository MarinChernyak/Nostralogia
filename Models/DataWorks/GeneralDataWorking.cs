using Nostralogia2._1.Models.DataWorks;
using Nostralogia2._1.NostraDataServ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2.Models.DataWorks
{
    public class GeneralDataWorking
    {
        private PersonalRecords _pers;
        public DisplayPersonalRecord[] Persons10
        {
            get
            {
                if (_pers == null)
                {
                    _pers = new PersonalRecords();

                }
                return _pers.PeopleDataCollection;
            }
        }
        private HystoricalRecords _hist;
        public HystoricalRecords Hystorical10
        {
            get
            {
                if (_hist == null)
                {
                    _hist = new HystoricalRecords();

                }
                return _hist;
            }
        }
    }
}