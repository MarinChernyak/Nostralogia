
    function CalendarDataManipulator(idCalendar, year, month, day) {

        this.ID_Calendar = idCalendar;

        this.ID_cmbMonhes = "ID_cmbMonthes_" + idCalendar;
        this.ID_mainContainer = 'ID_mainContainer_' + idCalendar;
        this.ID_cldr_value = 'ID_cldr_value_' + idCalendar;
        this.ID_cldrEditBox = 'ID_cldrEditBox_' + idCalendar;
        this.ID_timeContainer = 'ID_time_' + idCalendar;
        this.ID_time_closeicon = 'ID_time_close_icon_' + idCalendar + 'time';
        this.Day = day;
        this.ID_calendarTable = 'ID_calendarTable_' + idCalendar;

        this.lblYear = [];
        for (var i = 0; i < 4; ++i) {
            var val = 'lbl_' + idCalendar + '_' + (i + 1);
            this.lblYear[i] = val;
        }

        this.InitControl(year, month, day);
        this.UpdateDateTime();
    }
    CalendarDataManipulator.prototype = {
        InitControl: function (year, month, day) {

            var sMonthVal = this.UpdateMonthVal(month);
            $("#" + this.ID_cmbMonhes).val(sMonthVal);
            $("#" + this.ID_timeContainer).hide();
            $("#" + this.ID_time_closeicon).show();
            $("#" + this.ID_mainContainer).hide();
            this.setYear(year);
        },
        //---------------------------------------------------------------
        UpdateMonthVal: function (monthval) {
            var sMonthval = '';
            sMonthval += monthval;
            if (sMonthval.length == 1)
                sMonthval = '0' + monthval;
            return sMonthval;
        },
        //--------------------------------------------------------------
        OnClickYearChange: function (index, value) {
            var val = ($("#" + this.lblYear[index]).html()) * 1 + value;
            if (val > 9)
                val = 0;
            else if (val < 0)
                val = 9;
            $("#" + this.lblYear[index]).text(val);
        },
        //-----------------------------------------------------------
        UpdateCalendar: function (visibleContainer) {
            var main = $("#" + this.ID_mainContainer);
            var ebox = $("#" + this.ID_cldrEditBox);
            var tbox = $("#" + this.ID_timeContainer);

            if (visibleContainer == "m") {
                this.ShowMain();
                ebox.hide();
                tbox.hide();
            }
            else if (visibleContainer == "t") {
                main.hide();
                tbox.show();
                ebox.hide();
            }
            else {

                main.hide();
                ebox.show();
                tbox.hide();
                this.UpdateDateTime();
            }
        },
        UpdateDateTime: function () {
            var monthval = $("#" + this.ID_cmbMonhes + " option:selected").val();
            var year = this.getYear();
            var day = 'XX';
            if (day.length == 1)
                day = "0" + day;
            var calValue = year + '-' + monthval + '-' + day;

            $("#" + this.ID_cldr_value).text(calValue);

        },
        ShowMain: function () {
            $("#" + this.ID_mainContainer).show();
            var year = this.getYear();
            var monthval = $("#" + this.ID_cmbMonhes + " option:selected").val();
            //var calTable = new CalendarTable();
            this.UpdateCalendarTable(year, monthval, this.Day);
        },
        getYear: function () {

            var y1000 = $("#" + this.lblYear[0]).html();
            var y100 = $("#" + this.lblYear[1]).html();
            var y10 = $("#" + this.lblYear[2]).html();
            var y1 = $("#" + this.lblYear[3]).html();

            return y1000 * 1000 + y100 * 100 + y10 * 10 + y1 * 1;
        },
        setYear: function (year) {

            var y1000 = ~~(year / 1000);
            $("#" + this.lblYear[0]).text(y1000);

            var sum = y1000 * 1000;
            var dH = (year - sum) / 100;
            var y100 = ~~(dH);
            $("#" + this.lblYear[1]).text(y100);

            sum = sum + y100 * 100;
            var dec = (year - sum) / 10;
            var y10 = ~~(dec);
            $("#" + this.lblYear[2]).text(y10);

            sum = sum + y10 * 10;
            var y1 = ~~(year - sum);
            $("#" + this.lblYear[3]).text(y1);
        },
        UpdateCalendarTable: function (year, month, day) {
            var caltable = new CalendarTable(year, month, day, this.ID_Calendar);
            var caltableHTML = caltable.getCalendarTable();
            $("#" + this.ID_calendarTable).empty();
            $("#" + this.ID_calendarTable).append(caltableHTML);

        },
        GetMonthFromId: function (id) {
            var pos = id.lastIndexOf("_");
            var mnth = id.substring(pos + 1);

            return mnth * 1 + 1;
        },
        OnCalendarCell: function (id) {
            var pos = id.indexOf("_", 1);
            var selectedDiv = $("#" + id);
            var clss = $("#" + id).attr('class');

            var selecteddiv = $("#" + this.ID_mainContainer).find(".Cldr_Cell_selDay");
            selectedDiv.removeClass("Cldr_Cell_selDay");
            selectedDiv.addClass("Cldr_Cell_belongMonth");

            var day = $(this).html();
            var month = $("#" + this.ID_cmbMonhes).val();
            var sMonthSel = this.GetMonthFromId(id);

            if (sMonthSel * 1 == month * 1) {
                $(this).removeClass(clss);
                $(this).addClass("Cldr_Cell_selDay");
            }
            else {
                this.UpdateCalendarTable(getYear(), sMonthSel, day);
                $("#" + this.ID_cmbMonhes).val(UpdateMonthVal(sMonthSel));
            }
        }

    }

    ////////////////
    function CalendarTable(year, month, day, calendarID) {
        this.date = new Date(year * 1, month * 1 - 1, day * 1, 0, 0, 0, 0);

        this._calendarID = calendarID;
        this._calTable = "";
    }
    CalendarTable.prototype = {

        getCalendarTable: function () {
            this._calTable = "<div id=\"ID_calendarTable" + this._calendarID + "\">";
            var caldate = this.addTableRow(1);
            while (caldate.getMonth() == this.date.getMonth()) {
                caldate = this.addTableRow(caldate.getDate());
            }
            this._calTable = this._calTable + "</div>";

            return this._calTable;
        },

        addTableRow: function (startday) {
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

        },
        addDayFromOtherMonth: function (month, day) {
            this._calTable = this._calTable + "<div class=\"Cldr_Cell\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
        },
        addweekEndDay: function (month, day) {
            this._calTable = this._calTable + "<div class=\"Cldr_Cell_HolyDay\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
        },
        addMonthCalendarDay: function (month, day) {
            this._calTable = this._calTable + "<div class=\"Cldr_Cell_belongMonth\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
        },
        addSelectedDay: function (month, day) {
            this._calTable = this._calTable + "<div class=\"Cldr_Cell_selDay\" id=\"" + this._calendarID + "_" + day + "_" + month + "\">" + day + "</div>"
        }
    }
