function TimeDataManipulator(idTime) {

    this.idTime = idTime;
}
TimeDataManipulator.prototype = {
    InitControl: function (Hour, Min, Sec) {

        this.UpdateHour(Hour);
        this.UpdateMin(Min);
        this.UpdateSec(Sec);

   },
    UpdateHour:function(Value){
        this.UpdateCategoryWithNum(Value, "H");
    },
    UpdateMin:function(Value){
        this.UpdateCategoryWithNum(Value, "M");
    },
    UpdateSec: function (Value) {
        this.UpdateCategoryWithNum(Value, "S");
    },
    //category "H","M","S"
    UpdateCategoryWithNum:function(Value, category)
    {
        var v1 = 0;
        var v10 = 0;
        if (Value > 9) {
            v10 = Math.floor(Value / 10);
            v1 = Value % 10;
        }
        else
            v1 = Value;
        $("#" + this.idTime + "_t"+ category +"10").text(v10);
        $("#" + this.idTime + "_t" + category + "1").text(v1);

    },
    // element is H10,M1,S10 etc. Case sencitive!
    UpdateElement: function (Value, element) {

        var curValue = $("#" + this.idTime + "_t" + element).html();
        var vElem = curValue * 1 + Value;
        if (vElem > 0) {
            if ((element == 'H10' && vElem > 2) || (element == "M10" || element == "S10") && vElem > 5)
                vElem = 0;
            else if (element == 'H10' && vElem == 2) {
                var H1 = $("#" + this.idTime + "_tH1").html();
                if(H1>3)
                    $("#" + this.idTime + "_tH1").text("3");
            }
            else if ((element == "S1" || element == "M1") && vElem > 9) {
                vElem = 0;
            }
            else if (element == "H1") {
                var H10 = $("#" + this.idTime + "_tH10").html();
                if ((H10 < 2 && vElem > 9) || (H10 == 2 && vElem > 3))
                    vElem = 0;
            }
        }
        else if(vElem<0) {
            if (element == "S1" || element == "M1")
                vElem = 9;
            else if(element == "M10" || element == "S10")
                vElem = 5;
            else if (element == "H10") {
                vElem = 2;
                var H1 = $("#" + this.idTime + "_tH1").html();
                if (H1 > 3)
                    $("#" + this.idTime + "_tH1").text("3");
            }
            else if (element == "H1") {
                var H10 = $("#" + this.idTime + "_tH10").html();
                if (H10 == 2)
                    vElem = 3;
                else
                    vElem = 9;
            }

        }
        

        $("#" + this.idTime + "_t" + element).text(vElem);
    },
    //category "H","M","S"
    GetTimeDataValue: function (category) {

        var V10 = $("#" + this.idTime + "_t" + category + "10").html();
        
        var V1 = $("#" + this.idTime + "_t" + category + "1").html();

        return V10 + V1;
    },
    ToString: function () {

        return this.GetTimeDataValue("H") + ":" + this.GetTimeDataValue("M") + ":" + this.GetTimeDataValue("S");
    },
    GetTimeNumber: function () {
        var output = 0;
        output = this.GetTimeDataValue("H") * 1 + this.GetTimeDataValue("M") / 60.0 + this.GetTimeDataValue("S") / 3600.0;
        return output;
    }

}