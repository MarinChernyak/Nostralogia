var ID_tH10add;//@Model.GetID("tH10add")
var ID_tH10;//@Model.GetID("tH10
var ID_tH1; //@Model.GetID("tH1")
var ID_tH10min;//@Model.GetID("tH10min")
var ID_tH1add;//"+ID_tH1add
var ID_tH1min;//#@Model.GetID("tH1min")
var ID_tM10add;//"+ID_tM10add
var ID_tM10min;//#@Model.GetID("tM10min
var ID_tM10;//@Model.GetID("tM10")
var ID_tM1add;//@Model.GetID("tM1add")"
var ID_tM1;//@Model.GetID("tM1")
var ID_tM1min;//@Model.GetID("tM1min")
var ID_tS10add;//@Model.GetID("tS10add")
var ID_tS10;//@Model.GetID("tS10")
var ID_tS10min;//@Model.GetID("tS10min")
var ID_tS1add;//@Model.GetID("tS1add")"
var ID_tS1;//'@Model.GetID("tS1")
var ID_tS1min;

function DisplayTimeData() {
    var h10 = $("#" + ID_tH10).html();
    var h1 = $("#" + ID_tH1).html();
    var h = h10 * 10 + h1 * 1;
    if (h10 == 0)
        h = "0" + h;

    var m10 = $("#" + ID_tM10).html();   
    var m1 = $("#" + ID_tM1).html();
    var m = m10 * 10 + m1 * 1;
    if (m10 == 0)
        m = "0" + m;
    var s10 = $("#" + ID_tS10).html();
    var s1 = $("#" + ID_tS1).html();
    var s = s10 * 10 + s1 * 1;
    if (s10 == 0)
        s = "0" + s;

    return h + ":" + m + ":" + s;
}

$("#"+ID_tH10add).on("click", function () {
    var valH10 = parseInt( $("#"+ID_tH10).html(),10);
    var valH1 = parseInt($("#"+ID_tH1).html(), 10);
    valH10 += 1;
    if (valH10 > 2) {
        valH10 = 0;
    }            
    else if (valH10 == 2 && valH1>3) {
        valH1 = 0;
        $("#"+ID_tH1).html(valH1);
    }
    $("#"+ID_tH10).html(valH10);
});
$("#"+ ID_tH10min).on("click", function () {
    var valH10 = parseInt($("#"+ID_tH10).html(), 10);
    var valH1 = parseInt($("#"+ID_tH1).html(), 10);
    valH10 -= 1;
    if (valH10<0) {
        valH10 = 2;
    }
    if (valH10 == 2 && valH1 > 3) {
        valH10 = 0;
        $("#"+ID_tH1).html(valH10);
    }

    $("#"+ID_tH10).html(valH10);
});
$("#"+ID_tH1add).on("click", function () {
    var valH1 = parseInt($("#"+ID_tH1).html(), 10);
           
    valH1 += 1;
    var valH10 = parseInt($("#"+ID_tH10).html(), 10);
          
    if (valH10<2 && valH1 > 9) {
        valH1 = 0;                
    }
    else if (valH10 == 2 && valH1 > 3) {
        valH1 = 0;
    }
    $("#"+ID_tH1).html(valH1);
});
$("#"+ID_tH1min).on("click", function () {
    var valH1 = parseInt($("#"+ID_tH1).html(), 10);
    var valH10 = parseInt($("#"+ID_tH10).html(), 10);
    valH1 -= 1;
            
    if (valH10==2 && valH1 < 0) {
        valH1 = 3;                
    }
    if (valH1 < 2 && valH1<0) {
        valH1 = 9;                
    }
            
    $("#"+ID_tH1).html(valH1);
});

//----------------- minutes ---------------------
$("#" + ID_tM10add).on("click", function () {

    AddVal10(ID_tM10)
});
$("#"+ID_tM10min).on("click", function () {
    MinVal(ID_tM10,10);
});
$("#"+ID_tM1add).on("click", function () {
    AddVal1(ID_tM1);
});
$("#"+ID_tM1min).on("click", function () {
    MinVal(ID_tM1,1);
});

//----------------- sec ---------------------
$("#"+ID_tS10add).on("click", function () {
    AddVal10(ID_tS10)
});
$("#"+ID_tS10min).on("click", function () {
    MinVal(ID_tS10,10);
});
$("#"+ID_tS1add).on("click", function () {
    AddVal1(ID_tS1);
});
$("#" + ID_tS1min).on("click", function () {
    MinVal(ID_tS1,1);
});

//---------------------------------------------
function MinVal(elemId, order) {
    var val = parseInt($("#" + elemId).html(), 10);
    val -= 1;
    if (val <0) {
        val = order==1?9:5;
    }
    $("#" + elemId).html(val);
}
function AddVal10(elemId) {
    var val = parseInt($("#" + elemId).html(), 10);
    val += 1;
    if (val > 5) {
        val = 0;
    }
    $("#" + elemId).html(val);
}
function AddVal1(elemId) {
            
    var val = parseInt($("#" + elemId).html(), 10);
    val += 1;
    if (val > 9) {
        val = 0;
    }
    $("#" + elemId).html(val);
}