function clickYearChange(index, howMuchChanged, calID, IDcmbMonths, IDcmbDays) {
    //lbl_calDate1_1
    var idLabel = "lbl_"+calID + "_" + (index + 1);
    var val = $("#" + idLabel).html();
    val = val * 1 + howMuchChanged;
    if (val > 9)
        val = val - 10;
    else if (val < 0)
        val = val + 10;

    $("#" + idLabel).html(val);
    UpdateDays(calID, IDcmbMonths, IDcmbDays);
}
function getYear(calID) {
    var y1000 = $("#lbl_" + calID + "_1").html();
    var y100 = $("#lbl_"+calID + "_2").html();
    var y10 = $("#lbl_" + calID + "_3").html();
    var y1 = $("#lbl_" + calID + "_4").html();

    return y1000 * 1000 + y100 * 100 + y10 * 10 + y1 * 1;
}
function UpdateDays(CalID, IDcmbMonths, IDcmbDays) {

    var monthval = $("#"+IDcmbMonths+" option:selected").val();

    var year = getYear(CalID);

    var day = $("#"+IDcmbDays+" option:selected").val();

    $("#" + IDcmbDays).empty();

    var curdate = new Date(year, monthval * 1 - 1, 1);

    while (curdate.getMonth() == monthval * 1 - 1) {

        $("#" + IDcmbDays).append($("<option>", {
            value: curdate.getDate(),
            text: curdate.getDate()
        }));

        curdate.setDate(curdate.getDate() + 1);

    }
}
function SetCalValue(calID, year, month, day) {
    var val1000 = Math.floor(year / 1000);
   var id = "#lbl_" + calID + "_1";
   $(id).text(val1000);

    var val100 = Math.floor((year - val1000 * 1000) / 100);
    $("#lbl_" + calID + "_2").text(val100);

    var val10 = Math.floor((year - val1000 * 1000 - val100 * 100) / 10);
    $("#lbl_" + calID + "_3").text(val10);

    var val1 = year - val1000 * 1000 - val100 * 100 - val10 * 10;
    $("#lbl_" + calID + "_4").text(val1);

    $("#ID_cmbMonthes_" + calID).val(month);
    $("#ID_cmbDays_" + calID).val(day);

    if (day.length == 1)
        day = "0" + day;
    var calValue = year + '-' + month + '-' + day;
    $("#ID_cldr_value_" + calID).html(calValue);
}
function UpdateCalValue(CalID, IDcmbMonths, IDcmbDays, hour, min, sec) {

    var monthval = $("select#" + IDcmbMonths).val();//+ " option:selected"
    var year = getYear(CalID);
    var day = $("#" + IDcmbDays + " option:selected").val();
    
    if (day.length == 1)
        day = "0" + day;
    var calValue = year + '-' + monthval + '-' + day; 
    if (hour != '' && min != '' && sec != '') {
        calValue = calValue + '&nbsp;&nbsp;&nbsp;&nbsp;' + UpdateCalValueVithTimeData(hour) + ":" + UpdateCalValueVithTimeData(min) + ":" + UpdateCalValueVithTimeData(sec);
    }
    $("#ID_cldr_value_" + CalID).html(calValue);
}
function UpdateCalValueVithTimeData(valTime) {
    var sVal="00";
    if (valTime != '')
        sVal = valTime;
   
    return sVal;
}
function InitCalendar(calID, IDcmbMonths, IDcmbDays) {

    $("#lbl_" + calID + "_1").text('1');
    $("#lbl_" + calID + "_2").text('9');
    $("#lbl_" + calID + "_3").text('0');
    $("#lbl_" + calID + "_4").text('0');

    $("#" + IDcmbMonths).val("1");
    $("#" + IDcmbDays).val("1");

}
///////////////////////////



//////////// For a future developement - calendar table
function getCalendarTable() {
    this._calTable = "<div id=\"ID_calendarTable" + this._calendarID + "\">";
    var caldate = this.addTableRow(1);
    while (caldate.getMonth() == this.date.getMonth()) {
        caldate = this.addTableRow(caldate.getDate());
    }
    this._calTable = this._calTable + "</div>";
    return this._calTable;
}

function addTableRow(startday) {
    var initdate = null;
    initdate = new Date(this.date.getFullYear(), this.date.getMonth(), startday, 0, 0, 0, 0);
    if (startday == 1) {
        initdate.setDate(initdate.getDate() - initdate.getDay());
    }
    this._calTable = this._calTable + "<div class=\"Cldr_InnerRow\">";
    for (var index = 0; index < 7; index++) {
        var dayClass = "";
        var day = initdate.getDate()
        var month = initdate.getMonth();
        if (day == this.date.getDate() && month == this.date.getMonth()) {
            this.addSelectedDay(month, day);
        }
        else {
            if ((day > 6 && month < this.date.getMonth()) || (day < 6 && month > this.date.getMonth())) {
                this.addDayFromOtherMonth(initdate.getMonth(), initdate.getDate());
            }
            else if ((initdate.getDay() == 0 || initdate.getDay() == 6) && month == this.date.getMonth()) {
                this.addweekEndDay(month, day);
            }
            else {
                this.addMonthCalendarDay(month, day);
            }
        }
        initdate.setDate(initdate.getDate() + 1);

    }
    this._calTable = this._calTable + "</div>";
    return initdate;

}
function addDayFromOtherMonth(month, day) {
    this._calTable = this._calTable + "<div class=\"Cldr_Cell\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
}
function addweekEndDay(month, day) {
    this._calTable = this._calTable + "<div class=\"Cldr_Cell_HolyDay\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
}
function addMonthCalendarDay(month, day) {
    this._calTable = this._calTable + "<div class=\"Cldr_Cell_belongMonth\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
}
function addSelectedDay(month, day) {
    this._calTable = this._calTable + "<div class=\"Cldr_Cell_selDay\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
}