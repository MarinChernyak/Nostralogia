using Nostralogia2._1.NostraDataServ;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nostralogia2._1.Models.DataWorks
{
    public class PersonalRecords : BaseModelWithUserData
    {
        public PersonalRecords(int numRecors = 10)
        {
            InitCollection(numRecors);
        }
        private DisplayPersonalRecord[] _peopleData;
        public DisplayPersonalRecord[] PeopleDataCollection
        {
            get
            {
                return _peopleData;
            }
        }
        private void InitCollection(int numRecors)
        {
            using (NostraDataServClient serv = new NostraDataServClient())
            {
                
                _peopleData = serv.GetLastPersonalDataCollection(numRecors, Lang);
            }
        }
    }
}