//function CalendarData(currentMonth,ID_cmbMonthes,ID_time,ID_time_closeicon,ID_cldr_value,
//         ID_main_container, ID_cldrEditBox, ID_clockicon, ID_cldr_icon,ID_close_icon,
//         IDH10,IDH1,IDM10,IDM1,IDS10,IDS1,IDY0,IDY1,IDY2,IDY3,
//         IDY0butUp,IDY1butUp,IDY2butUp,IDY3butUp,IDY0butDown,IDY1butDown,IDY2butDown,IDY3butDown,
//         IDY0Label,IDY1Label,IDY2Label,IDY3Label,ID_calendarTable)
//{
//    this.currentMonth=currentMonth;//@Model._month.CurrentMonth
//    this.ID_cmbMonthes=ID_cmbMonthes;//@Model.ID_cmbMonthes
//    this.ID_time=ID_time;//@Model.ID_time
//    this.ID_time_closeicon=ID_time_closeicon; //@Model._tm.ID_time_closeicon
//    this.ID_cldr_value=ID_cldr_value;// Model.ID_cldr_value
//    this.ID_main_container=ID_main_container; //Model.ID_main_container
//    this.ID_cldrEditBox=ID_cldrEditBox; //@Model.ID_cldrEditBox
//    this.ID_clockicon=ID_clockicon; //@Model.ID_clockicon
//    this.ID_cldr_icon=ID_cldr_icon; //@Model.ID_cldr_icon
//    this.ID_close_icon=ID_close_icon;//@Model.ID_close_icon
//    this.IDH10=IDH10;//@Model._tm.GetID("tH10")
//    this.IDH1=IDH1; //@Model._tm.GetID("tH1")
//    this.IDM10=IDM10;//@Model._tm.GetID("tM10")
//    this.IDM1=IDM1; //@Model._tm.GetID("tM1")"
//    this.IDS10=IDS10; //@Model._tm.GetID("tS10")
//    this.IDS1=IDS1; //@Model._tm.GetID("tS1")
//    this.IDY0=IDY0;//@Model.getYearNum(0).GetLabelId()
//    this.IDY1=IDY1;//@Model.getYearNum(1).GetLabelId()
//    this.IDY2=IDY2;//@Model.getYearNum(2).GetLabelId()
//    this.IDY3=IDY3;//@Model.getYearNum(1).GetLabelId()
//    this.IDY0butUp=IDY0butUp;//@Model.getYearNum(0).GetButtonIdUp()
//    this.IDY1butUp=IDY1butUp;//@Model.getYearNum(0).GetButtonIdUp()
//    this.IDY2butUp=IDY2butUp;//@Model.getYearNum(0).GetButtonIdUp()
//    this.IDY3butUp=IDY3butUp;//@Model.getYearNum(0).GetButtonIdUp()
//    this.IDY0butDown=IDY0butDown;//@Model.getYearNum(0).GetButtonIdDown()
//    this.IDY1butDown=IDY1butDown;//@Model.getYearNum(0).GetButtonIdDown()
//    this.IDY2butDown=IDY2butDown;//@Model.getYearNum(0).GetButtonIdDown()
//    this.IDY3butDown=IDY3butDown;//@Model.getYearNum(0).GetButtonIdDown()
//    this.IDY0Label=IDY0Label;//@Model.ListYear[0].GetLabelId()
//    this.IDY1Label=IDY1Label;//@Model.ListYear[1].GetLabelId()
//    this.IDY2Label=IDY2Label;//@Model.ListYear[2].GetLabelId()
//    this.IDY3Label=IDY3Label;//@Model.ListYear[3].GetLabelId()
//    this.ID_calendarTable=ID_calendarTable;//@Model.ID_calendarTable
//}
//    CalendarData.prototype={
//        getYear:function () {
//        var yval0 = $("#" + this.IDY0).html();
//        var yval1 = $("#" + this.IDY1).html();
//        var yval2 = $("#" + this.IDY2).html();
//        var yval3 = $("#" + this.IDY3).html();

//        return yval0 * 1000 + yval1 * 100 + yval2 * 10 + yval3 * 1;
//    },
//    DisplayCalendarData:function () {
//    var dayval = $(".Cldr_Cell_selDay").html();
//    var monthval = $("#"+this.ID_cmbMonthes+" option:selected").val();
        
//    var yearval = this.getYear();

//    return dayval+'/'+monthval+'/'+yearval;    
//},

//    UpdateCalendarCtrls:function()
//    {
//        var sMonthVal = this.UpdateMonthVal(this.currentMonth);

//        $("#" + this.ID_cmbMonthes).val(sMonthVal);
//        $("#" + this.ID_time).addClass("Cldr_hidden");
//        $("#" + this.ID_time_closeicon).removeClass("Cldr_hidden");
//        $("#" + this.ID_cldr_value).html(this.getDateTimeOut());
//    },

//    UpdateCalendar:function (visibleContainer) {

//        var main = $("#" + this.ID_main_container);
//        var ebox = $("#" + this.ID_cldrEditBox);
//        var tbox = $("#" + this.ID_time);
//        if (visibleContainer == "m") {
//            main.removeClass("Cldr_hidden");
//            ebox.addClass("Cldr_hidden");
//            tbox.addClass("Cldr_hidden");
//        }
//        else if (visibleContainer == "t") {
//            main.addClass("Cldr_hidden");
//            tbox.removeClass("Cldr_hidden");
//            ebox.addClass("Cldr_hidden");
//        }
//        else {
//            main.addClass("Cldr_hidden");
//            ebox.removeClass("Cldr_hidden");
//            tbox.addClass("Cldr_hidden");
//        }

//    },
//    getDateTimeOut:function () {
//        var sout = this.getDate();
//        sout = sout + "<span class=\"Cldr_margleft20\">" + this.getTime() + "</span>";
//        return sout;
//    },
//    getTime:function() {

//            var tVal = $("#" + IDH10).html().trim();
//            tVal = tVal + $("#" + this.IDH1).html().trim();
//            tVal = tVal + ":" + $("#" + this.IDM10).html().trim();
//            tVal = tVal + $("#" + this.IDM1).html().trim();
//            tVal = tVal + ":" + $("#" + this.IDS10).html().trim();
//            tVal = tVal + $("#" + this.IDS1).html().trim();
//            return tVal;
//    },
//    getDate:function () {
//        //format data: 2011-06-02 11:16:53.393

//        var monthval = $("#" + this.ID_cmbMonthes + " option:selected").val();

//        var dayval = $(".Cldr_Cell_selDay").html();

//        if (dayval.length == 1)
//            dayval = "0" + dayval;

//        return dayval + "-" + this.UpdateMonthVal(monthval) + "-" + this.getYear();
//    },
//        //????????????????????????????????????????????????????
//        //$("#tH10").on("click", function () {
//        //    clickYearChange(0, '+');
//        //});
//        //??????????????????????????????????????????????????????



//        //////////////// Parent side to //////
//        getCalendarData:function () {
//             var monthval = $("#" + this.ID_cmbMonthes + " option:selected").val();
//            var dayval = $(".Cldr_Cell_selDay").html();
//            var calJson = {
//                y1: $("#" + this.IDY0Label).html(),
//                y2: $("#" + this.IDY1Label).html(),
//                y3: $("#" + this.IDY2Label).html(),
//                y4: $("#" + this.IDY3Label).html(),
//                month: monthval,
//                day: dayval
//            };
//            return calJson;
//        },
//        clickYearChange:function (indexyear, actionval) {

//            var calJson = getCalendarData();
//            calJson['idy'] = indexyear;
//            calJson['action'] = actionval;
//            $.ajax({
//                type: "POST",
//                cache: false,
//                url: "/Calendar/YearChangedValue",
//                data: JSON.stringify(calJson),
//                contentType: "application/json",
//                datatype: "json",
//                success: function (data) {

//                    $("#" + this.ID_calendarTable).html(data.calendarHTML);
//                    $("#" + this.IDY0Label).html(data.y1);
//                    $("#" + this.IDY1Label).html(data.y2);
//                    $("#" + this.IDY2Label).html(data.y3);
//                    $("#" + this.IDY3Label).html(data.y4);

//                }


//            });

//        },
//        ////////////////////////////////
//        clickMonthChanged:function()
//        {
//            var calJson = getCalendarData();

//            $.ajax({
//                type: "POST",
//                cache: false,
//                url: "/Calendar/DayMonthChangedValue",
//                data: JSON.stringify(calJson),
//                contentType: "application/json",
//                datatype: "json",
//                success: function (data) {
//                    $("#" + this.IDY0Label).html(data.y1);
//                    $("#" + this.IDY1Label).html(data.y2);
//                    $("#" + this.IDY2Label).html(data.y3);
//                    $("#" + this.IDY3Label).html(data.y4);
//                    var sMonthVal = UpdateMonthVal(data.month);

//                    $("#"+this.ID_cmbMonthes).val(sMonthVal);
//                    $("#" + this.ID_calendarTable).html(data.calendarHTML);
//                }
//            });
//        },
//        UpdateMonthVal:function (monthval) {
//            var sMonthval = '';
//            sMonthval += monthval;
//            if (sMonthval.length == 1)
//                sMonthval = '0' + monthval;

//            return sMonthval;
//        },
//        ///////////////////////////////////////

//        UpdateCalendarDay:function (day, divclass,e) {
//            e.stopPropagation();
//            if (divclass == 'Cldr_Cell' || divclass == 'Cldr_Cell_HolyDay' || divclass == 'Cldr_Cell_belongMonth') {
//                var calJson = this.getCalendarData();
                
//                calJson['day'] = day;
//                if (divclass == 'Cldr_Cell') {
//                    var monthval = $("#" + this.ID_cmbMonthes + " option:selected").val();

//                    if (day > 10) {
//                        var m = parseInt(monthval, 10) - 1;
//                        calJson['month'] = m;
//                        $("#" + this.ID_cmbMonthes).val(UpdateMonthVal(m));
//                    }
//                    else {
//                        var m = parseInt(monthval, 10) + 1;
//                        calJson['month'] = m;
//                        $("#" + this.ID_cmbMonthes).val(UpdateMonthVal(m));

//                    }
//                }

//                $.ajax({
//                    type: "POST",
//                    cache: false,
//                    url: "/Calendar/DayMonthChangedValue",
//                    data: JSON.stringify(calJson),
//                    contentType: "application/json",
//                    datatype: "json",
//                    success: function (data) {
//                        $("#"+this.IDY0).html(data.y1);
//                        $("#" + this.IDY1).html(data.y2);
//                        $("#" + this.IDY2).html(data.y3);
//                        $("#" + this.IDY3).html(data.y4);
//                        $("#"+this.this.ID_cmbMonthes).val(UpdateMonthVal(data.month));
//                        $("#" + this.ID_calendarTable).html(data.calendarHTML);
//                    }

//                });
//            }

//        });
//    }
//    else
//        TestVariables();


//});
////function AddtoError(ERR, err) {
////    return ERR + err + "\n";
////}
////function TestVariables() {
////    var ERROR = "There are found error variables:\n";
////    var err = "";
////    var count=0;
////    if (currentMonth == undefined) {
////        ERROR=AddtoError(ERROR,"currentMonth");
////        count++;
////    }
////    if (this.ID_cmbMonthes == undefined){
////        ERROR=AddtoError(ERROR,"ID_cmbMonthes");
////        count++;
////    }
////    if (ID_time == undefined){
////        ERROR=AddtoError(ERROR,"ID_time");
////        count++;
////    }
////    if (ID_time_closeicon == undefined){
////        ERROR=AddtoError(ERROR,"ID_time_closeicon");
////        count++;
////    }
////    if (ID_cldr_value == undefined){
////        ERROR=AddtoError(ERROR,"ID_cldr_value");
////        count++;
////    }
////    if (ID_main_container == undefined){
////        ERROR=AddtoError(ERROR,"ID_main_container");
////        count++;
////    }
////    if (ID_cldrEditBox == undefined){
////        ERROR=AddtoError(ERROR,"ID_cldrEditBox");
////        count++;
////    }
////    if (ID_clockicon == undefined){
////        ERROR=AddtoError(ERROR,"ID_clockicon");
////        count++;
////    }
////    if (ID_cldr_icon == undefined){
////        ERROR=AddtoError(ERROR,"ID_cldr_icon");
////        count++;
////    }
////    if (ID_close_icon == undefined){
////        ERROR=AddtoError(ERROR,"ID_close_icon");
////        count++;
////    }
////    if (IDH10 == undefined){
////        ERROR=AddtoError(ERROR,"IDH10");
////        count++;
////    }
////    if (IDH1 == undefined){
////        ERROR=AddtoError(ERROR,"IDH1");
////        count++;
////    }
////    if (IDM10 == undefined){
////        ERROR=AddtoError(ERROR,"IDM10");
////        count++;
////    }
////    if (IDM1 == undefined){
////        ERROR=AddtoError(ERROR,"IDM1");
////        count++;
////    }
////    if (IDS10 == undefined){
////        ERROR=AddtoError(ERROR,"IDS10");
////        count++;
////    }
////    if (IDS1 == undefined){
////        ERROR=AddtoError(ERROR,"IDS1");
////        count++;
////    }
////    if (IDY0 == undefined){
////        ERROR=AddtoError(ERROR,"IDY0");
////        count++;
////    }
////    if (IDY1 == undefined){
////        ERROR=AddtoError(ERROR,"IDY1");
////        count++;
////    }
////    if (IDY2 == undefined){
////        ERROR=AddtoError(ERROR,"IDY2");
////        count++;
////    }
////    if (IDY3 == undefined){
////        ERROR=AddtoError(ERROR,"IDY3");
////        count++;
////    }
////    if (IDY0butUp == undefined){
////        ERROR=AddtoError(ERROR,"IDY0butUp");
////        count++;
////    }
////    if (IDY1butUp == undefined){
////        ERROR=AddtoError(ERROR,"IDY1butUp");
////        count++;
////    }
////    if (IDY2butUp == undefined){
////        ERROR=AddtoError(ERROR,"IDY2butUp");
////        count++;
////    }
////    if (IDY3butUp == undefined){
////        ERROR=AddtoError(ERROR,"IDY3butUp");
////        count++;
////    }
////    if (IDY0butDown == undefined){
////        ERROR=AddtoError(ERROR,"IDY0butDown");
////        count++;
////    }
////    if (IDY1butDown == undefined){
////        ERROR=AddtoError(ERROR,"IDY1butDown");
////        count++;
////    }
////    if (IDY2butDown == undefined){
////        ERROR=AddtoError(ERROR,"IDY2butDown");
////        count++;
////    }
////    if (IDY3butDown == undefined){
////        ERROR=AddtoError(ERROR,"IDY3butDown");
////        count++;
////    }
////    if (IDY0Label == undefined){
////        ERROR=AddtoError(ERROR,"IDY0Label");
////        count++;
////    }
////    if (IDY1Label == undefined){
////        ERROR=AddtoError(ERROR,"IDY1Label");
////        count++;
////    }
////    if (IDY2Label == undefined){
////        ERROR=AddtoError(ERROR,"IDY2Label");
////        count++;
////    }
////    if (IDY3Label == undefined){
////        ERROR=AddtoError(ERROR,"IDY3Label");
////        count++;
////    }
////    if (ID_calendarTable == undefined){
////        ERROR=AddtoError(ERROR,"ID_calendarTable");
////        count++;
////    }

////    ERROR = ERROR + "number errors =" + count;
////    alert(ERROR);
////}

