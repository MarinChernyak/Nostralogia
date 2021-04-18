using Nostralogia2._1.Common;
using Nostralogia2._1.Models.DataWorks;
using Nostralogia2._1.SMAuthorization;
using SMDataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Nostralogia2._1.Models.Authentification
{
    public class RolesModel:SelectedListModel
    {
        public RolesModel(int idSel = -1)
        :base(idSel)
        {

        }
        protected override void InitSelectedData()
        {
            base.InitSelectedData();

            using (SMAuthorization.SMAuthorizationServClient serv = new SMAuthorization.SMAuthorizationServClient())
            {
                UserRole[] arData = serv.getAppRoles(Constants.AppID, Lang);
                foreach (UserRole sd in arData)
                {
                    if (sd.AccessLevel <= (int)Constants.ACESS_LEVEL.AL_RESTRICTED)
                    {
                        SelectListItem item = new SelectListItem() { Value = sd.RoleID.ToString(), Text = sd.RoleName };
                        if (sd.RoleID == _idSelected)
                            item.Selected = true;
                        _lstSelData.Add(item);
                    }
                }
            }
            //UpdateWithZeroItem();
        }
    }
}