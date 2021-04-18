
function EntityLib(isEnableForEdit, EntityIndex, idControl) {
    this.IsEnableForEdit = isEnableForEdit == 'True';
    this.ID_ImgCancel = "idimgCancel_" + EntityIndex;
    this.ID_ImgEdit = "idimgEdit_" + EntityIndex;
    this.ID_divControl = "iddivCtrl_" + EntityIndex;
    this.ID_Entity = "idEntity_" + EntityIndex;
    this.ID_Control = idControl;
    this.IdHidden = "idHiddenValue_" + EntityIndex;
    this.EntityIndex = EntityIndex;
    this.InitEntity();
}
EntityLib.prototype = {
    InitEntity: function () {
        this.InitBase();
    },
     InitBase: function () {
        this.UpdateButEdit(this.IsEnableForEdit);
        this.UpdateButCancel(false);
        this.UpdateControl(false);
    },
     UpdateButCancel: function (bShow) {
        if (bShow && this.IsEnableForEdit) {
            $('#' + this.ID_ImgCancel).show();
        }
        else {
            $('#' + this.ID_ImgCancel).hide();
       }
    },
     UpdateButEdit: function (bShow) {
         //alert(this.ID_ImgEdit);
        if (bShow && this.IsEnableForEdit) {
            $('#' + this.ID_ImgEdit).show();
        }
        else {
            $('#' + this.ID_ImgEdit).hide();
        }
    },
    UpdateControl: function (isShow) {
        
        if (isShow)
            $("#" + this.ID_Control).show();
        else {
            $("#" + this.ID_Control).hide();
        }
    },
    OnEditClicked: function () {

        this.UpdateControl(true);

        $('#' + this.ID_Entity).hide();

        $('#' + this.ID_ImgEdit).hide();

        $('#' + this.ID_ImgCancel).show();

    },
    OnCancelClicked: function () {
        this.UpdateControl(false);

        $('#' + this.ID_Entity).show();
        $('#' + this.ID_ImgEdit).show();
        $('#' + this.ID_ImgCancel).hide();
    }
}
////////////////////////////////////////////////////////////////////////
/////////////   Combo Entity    ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////
function ComboBoxEntity(isEnableForEdit, EntityIndex, idControl) {
    var arguments = [isEnableForEdit, EntityIndex, idControl];
    EntityLib.apply(this, arguments);
}
ComboBoxEntity.prototype = Object.create(EntityLib.prototype);
ComboBoxEntity.prototype.constructor = ComboBoxEntity;
ComboBoxEntity.prototype.getChange=function() {

    var valText = $("#" + this.ID_Control + " option:selected").text();
    $("#" + this.ID_Entity).html(valText);
}

////////////////////////////////////////////////////////////////////
/////////////   SimpleDataEntity   ////////////////////////////////////
/////////////////////////////////////////////////////////////////// 

function SimpleDataEntity(isEnableForEdit, idEntity, idCal) {
    var arguments = [isEnableForEdit, idEntity];
    EntityLib.apply(this, arguments);
    this.ID_Calendar = idCal;
    this.DisplayCalendarData();
}

SimpleDataEntity.prototype = Object.create(EntityLib.prototype);
SimpleDataEntity.prototype.constructor = SimpleDataEntity;
SimpleDataEntity.prototype.InitEntity = function () {
    EntityLib.prototype.InitBase.call(this);
}
SimpleDataEntity.prototype.DisplayCalendarData = function () {
    var calValue = this.GetEntityDateLabel();
    $("#" + this.ID_Entity).text(calValue);
}
SimpleDataEntity.prototype.GetEntityDateLabel = function () {
    var monthval = $("#ID_cmbMonthes_" + this.ID_Calendar + " option:selected").val();
    var year = this.getYear(this.ID_Calendar);
    var day = $("#ID_cmbDays_" + this.ID_Calendar + " option:selected").val();
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + '-' + monthval + '-' + day;
}
SimpleDataEntity.prototype.getYear = function () {
    var y1 = $("#lbl_" + this.ID_Calendar + "_1").html() * 1000;
    var y2 = $("#lbl_" + this.ID_Calendar + "_2").html() * 100;
    var y3 = $("#lbl_" + this.ID_Calendar + "_3").html() * 10;
    var y4 = $("#lbl_" + this.ID_Calendar + "_4").html() * 1;

    return y1 + y2 + y3 + y4;
}
SimpleDataEntity.prototype.OnCancelClicked = function () {
    EntityLib.prototype.OnCancelClicked.call(this);
    this.DisplayCalendarData();
}
////////////////////////////////////////////////////////////////////
/////////////   SimpleDataTimeEntity   ////////////////////////////////////
/////////////////////////////////////////////////////////////////// 
function SimpleDataTimeEntity(isEnableForEdit, idEntity, idCal, idTime) {

    var arguments = [isEnableForEdit, idEntity, idCal];
    SimpleDataEntity.apply(this, arguments);
    this.IdTime = idTime;
    this.DisplayCalendarTimeData();

}

SimpleDataTimeEntity.prototype = Object.create(SimpleDataEntity.prototype);
SimpleDataTimeEntity.prototype.constructor = SimpleDataTimeEntity;

SimpleDataTimeEntity.prototype.InitEntity = function () {
    EntityLib.prototype.InitBase.call(this);
}
SimpleDataTimeEntity.prototype.GetIDTime = function () {
    return this.IdTime;
}
SimpleDataTimeEntity.prototype.DisplayCalendarTimeData = function () {

    var calValue = this.GetEntityDateLabel() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + this.GetTimeData();
    $("#" + this.ID_Entity).html(calValue);
}
SimpleDataTimeEntity.prototype.GetTimeData = function () {
    var tmanipulator = new TimeDataManipulator(this.IdTime);
    return tmanipulator.ToString();
}
SimpleDataTimeEntity.prototype.OnCancelClicked = function () {
    EntityLib.prototype.OnCancelClicked.call(this);
    this.DisplayCalendarTimeData();
}
////////////////////////////////////////////////////////////////////
/////////////   TimeSelectionEntity   ////////////////////////////////////
/////////////////////////////////////////////////////////////////// 

function TimeSelectionEntity(isEnableForEdit, idEntity, idTime) {

    var arguments = [isEnableForEdit, idEntity];
    EntityLib.apply(this, arguments);
    this.IdTime = idTime;
    this.DisplayTimeData();

}

TimeSelectionEntity.prototype = Object.create(EntityLib.prototype);
TimeSelectionEntity.prototype.constructor = TimeSelectionEntity;
TimeSelectionEntity.prototype.InitEntity = function () {
    EntityLib.prototype.InitBase.call(this);
}
TimeSelectionEntity.prototype.DisplayTimeData = function () {

    var calValue = this.GetTimeData();
    $("#" + this.ID_Entity).html(calValue);
}
TimeSelectionEntity.prototype.GetTimeData = function () {
    var tmanipulator = new TimeDataManipulator(this.IdTime);
    return tmanipulator.ToString();
}
TimeSelectionEntity.prototype.OnCancelClicked = function () {
    EntityLib.prototype.OnCancelClicked.call(this);
    this.DisplayTimeData();
}
////////////////////////////////////////////////////////////////////
/////////////   TEXT ENTITY   ////////////////////////////////////
///////////////////////////////////////////////////////////////////
function TextEntity(isEnableForEdit, EntityIndex, idCtrl) {


    var arguments = [isEnableForEdit, EntityIndex, idCtrl];
    EntityLib.apply(this, arguments);
 
}
TextEntity.prototype = Object.create(EntityLib.prototype);
TextEntity.prototype.constructor = TextEntity;
TextEntity.prototype.OnEditClicked = function () {

    EntityLib.prototype.OnEditClicked.call(this);

    var valControl = $('#' + this.IdHidden).val();
    $('#' + this.ID_Control).val(valControl);
  
    $('#' + this.ID_divControl).show();
    $('#' + this.ID_Control).show();
    $('#' + this.ID_Entity).hide();
}
TextEntity.prototype.OnCancelClicked = function () {
    EntityLib.prototype.OnCancelClicked.call(this);
    var txtlength = 40;
    var enteredTxt = $('#' + this.ID_Control).val();
    var toShow = enteredTxt;
    if (enteredTxt.length > txtlength)
        toShow = enteredTxt.substring(0, txtlength) + "...";
    $('#' + this.IdHidden).val(enteredTxt);
    $('#' + this.ID_Entity).html(toShow);
    $('#' + this.ID_Entity).show();

    $('#' + this.ID_divControl).hide();
    $('#' + this.ID_Control).val('');

}

//--------------- Email --------------------
function EmailEntity(isEnableForEdit, EntityIndex, idCtrl) {
    var arguments = [isEnableForEdit, EntityIndex, idCtrl];
    this._dvErrorMessage = "dvErrorMessage";
    TextEntity.apply(this, arguments);
}
EmailEntity.prototype = Object.create(TextEntity.prototype);
EmailEntity.prototype.constructor = EmailEntity;

EmailEntity.prototype.InitEntity = function () {
    EntityLib.prototype.InitBase.call(this);
    //console.log("_dvErrorMessage = " + this._dvErrorMessage);
    $("#" + this._dvErrorMessage).hide();
}
EmailEntity.prototype.OnCancelClicked = function () {

    if (validateEmail($("#" + this.ID_Control).val())) {
        TextEntity.prototype.OnCancelClicked.call(this);
        $("#" + this._dvErrorMessage).hide();
    }
    else {
        $("#" + this._dvErrorMessage).show();
    }
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}

//--------------- Pasword --------------------
function PasswordEntity(isEnableForEdit, EntityIndex, idCtrl) {
    this._idCtrlConfirm = "CtrlConfirmPassWord";
    this._idLabel1 = "dvEntityLabel1";
    this._idLabel2 = "dvEntityLabel2";
    this._dvErrorMessage = "dvErrorMessage";
    this._dvCconfirmPass = "dvCconfirmPass";
    var arguments = [isEnableForEdit, EntityIndex, idCtrl];
    TextEntity.apply(this, arguments);
    this._confirmPass = "";
    
}
PasswordEntity.prototype = Object.create(TextEntity.prototype);
PasswordEntity.prototype.constructor = PasswordEntity;

PasswordEntity.prototype.InitEntity = function () {
    EntityLib.prototype.InitBase.call(this);

    $("#" + this._idCtrlConfirm).val($("#" + this.ID_Control).val());    
    $("#" + this._dvCconfirmPass).hide();
    $("#" + this._idLabel2).hide();
    $("#" + this._dvErrorMessage).hide();
}
PasswordEntity.prototype.CreateId= function ()
{
    EntityLib.prototype.CreateId.call(this);
    this._idCtrlConfirm = this.UpdateByID(this._idCtrlConfirm);
    this._idLabel1 = this.UpdateByID(this._idLabel1, this.EntityIndex);
    this._idLabel2 = this.UpdateByID(this._idLabel2, this.EntityIndex);
    this._dvErrorMessage = this.UpdateByID(this._dvErrorMessage, this.EntityIndex);
    this._dvCconfirmPass = this.UpdateByID(this._dvCconfirmPass, this.EntityIndex);
}
PasswordEntity.prototype.OnEditClicked = function () {

    TextEntity.prototype.OnEditClicked.call(this);
    $("#" + this._dvCconfirmPass).show();
    $("#" + this._idLabel2).show();
    $("#" + this._idLabel1).hide();
}
PasswordEntity.prototype.OnCancelClicked = function () {
    
    if ($("#" + this._idCtrlConfirm).val() == $("#" + this.ID_Control).val()) {
        TextEntity.prototype.OnCancelClicked.call(this);
        $("#" + this._dvCconfirmPass).hide();
        $("#" + this._idLabel2).hide();
        $("#" + this._idLabel1).show();
        $("#" + this._dvErrorMessage).hide();
    }
    else {
        $("#" + this._dvErrorMessage).show();
    }
}


////////////// CALENDAR ////////////////////////////
function CalendarEntity(isEnableForEdit, EntityIndex, idCal, idTime) {

    var arguments = [isEnableForEdit, EntityIndex, idCal];
    EntityLib.apply(this, arguments);
    this.IdTime = idTime;
}
CalendarEntity.prototype = Object.create(EntityLib.prototype);
CalendarEntity.prototype.constructor = CalendarEntity;


CalendarEntity.prototype.UpdateControl = function (isShow) {
    if (isShow) {
        $('#' + this.ID_divControl).show();
    }
    else {
        $('#' + this.ID_divControl).hide();
    }
    $('#' + this.ID_Entity).hide();
}
CalendarEntity.prototype.OnEditClicked = function () {

    EntityLib.prototype.OnEditClicked.call(this);

    

    $('#' + this.ID_Control).val(valControl);

    $('#' + this.ID_divControl).show();
    $('#' + this.ID_Control).show();
    $('#' + this.ID_Entity).hide();
}
CalendarEntity.prototype.OnCancelClicked = function () {
    EntityLib.prototype.OnCancelClicked.call(this);

    var date = $('#CalResult_Calendar_' + this.EntityIndex).val();
    var time = $('#TimeResult_Calendar_' + this.EntityIndex).val();

    $('#' + this.ID_Entity).html("<div class=\"Cldr_Value_box1\" >" + date + '</div><div class=\"Cldr_Value_box2\" >  ' + time + "</div>");
    $('#' + this.ID_Entity).show();

    $('#' + this.ID_divControl).hide();
    $('#' + this.ID_Control).val('');

}
////////////////////////////////////////////////////////////////////
/////////////   Geo ENTITY   ////////////////////////////////////
///////////////////////////////////////////////////////////////////
function GeoEntity(isEnableForEdit, EntityIndex, idCtrl) {
    var arguments = [isEnableForEdit, EntityIndex, idCtrl];
    EntityLib.apply(this, arguments);
}
GeoEntity.prototype = Object.create(EntityLib.prototype);
GeoEntity.prototype.constructor = GeoEntity;

GeoEntity.prototype.OnEditClicked = function () {
    EntityLib.prototype.OnEditClicked.call(this);

}
GeoEntity.prototype.OnCancelClicked = function () {
    EntityLib.prototype.OnCancelClicked.call(this);
    var dvData = $("#idEntity_" + this.EntityIndex);
    var country = $("#cmbCountries option:selected").text();
    var city = $("#cmbCities option:selected").text();
    dvData.html(city+" ("+country+")");
}