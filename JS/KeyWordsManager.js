function KWOpen() {    
    $("#dvKW_MainSelection").removeClass("KWM_hidden");
    $("#dvbutOpen").addClass("KWM_hidden");
}
function AddKW() {
    var selid = $("#genLeft").val();
    var txtItem = $("#genLeft").find('option:selected').text();
    if (txtItem != '' && !IsAlreadySelected(selid)) {
        $("#selRight").append('<option value="' + selid + '">' + txtItem + '</option>');
    }
    else if (txtItem == '') {
        alert('Please select some item!');
    }

}
function DrillDown(_url) {
    var selid = $("#genLeft").val();
    if (selid == undefined || selid == 0) {
        alert("Please select some item to drill it down!");
    }
    else {
        var jasonout = {};
        jasonout['idkw'] = selid * 1;
        $.ajax({
            type: "POST",
            url: _url,
            data: JSON.stringify(jasonout),
            contentType: "application/json",
            datatype: "json",
            success: function (data) {

                var arr = data.items[0].items;
                if (arr.length > 0) {
                    $("#genLeft").empty();
                    var listItems = "";
                    for (var i = 0; i < arr.length; i++) {
                        listItems += "<option value='" + arr[i].Value + "'>" + arr[i].Text + "</option>";
                    }
                    $("#genLeft").html(listItems);
                }
            }

        });
    }
}
function DrillUp(_url) {
    var selid = $("#genLeft").val();
    if (selid == undefined || selid == 0)
        selid = $("#genLeft option:first").val();

    var jasonout = {};
    jasonout['idkw'] = selid * 1;
    $.ajax({
        type: "POST",
        url: "/KeyWordsManager/DrillUp",
        data: JSON.stringify(jasonout),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {

            var arr = data.items[0].items;
            $("#genLeft").empty();
            var listItems = "";
            for (var i = 0; i < arr.length; i++) {
                listItems += "<option value='" + arr[i].Value + "'>" + arr[i].Text + "</option>";
            }
            $("#genLeft").html(listItems);
        }

    });
}
function OnOK() {
    var selValues = '';
    var texts = '';
    $("#selRight option").each(function () {
        selValues += this.value + ',';
        texts += this.textContent + ', ';
    });


    texts = texts.substring(0, texts.length - 2);
    $("#hdKWIDCoolection").val(selValues);
    $("#dvKW_MainSelection").addClass("KWM_hidden");
    $("#dvKW_txt_data").html(texts);
    $("#dvbutOpen").removeClass("KWM_hidden");

}
function OnCancel() {
    $("#dvbutOpen").removeClass("KWM_hidden");
    $("#dvKW_MainSelection").addClass("KWM_hidden");
}
function IsAlreadySelected(id) {
    var exists = false;
    $("#selRight option").each(function () {
        if (this.value == id) {
            exists = true;
        }
    });
    return exists;
}
function GetSelectedKeywordsList() {
    var outdata ='';
     $("#selRight option").each(function () {
         outdata += this.value + ','
    });    
    return outdata;
}