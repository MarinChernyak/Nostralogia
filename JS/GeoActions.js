function UpdateCountry() {
    var selCountry = $("#cmbCountries option:selected").val();
    var calJson = {
        countryval: selCountry
    };
    $.ajax({
        type: "POST",
        url: "/EventPlace/CountryChangedValue",
        data: JSON.stringify(calJson),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {

            UpdateCitiesCmb(data.items[0].items);
            UpdateStatesCmb(data.items[1].items);

            UpdateLabelAllCities();
        },
        fail: function (e) {
            alert("Country update error");
        }
    });
}
function UpdateStates() {
    var selState = $("#cmbStates option:selected").val();
    var calJson = {
        stateval: selState,
        countryval: $("#cmbCountries option:selected").val()
    };
    $.ajax({
        type: "POST",
        url: "/EventPlace/StateChangedValue",
        data: JSON.stringify(calJson),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {

            UpdateCitiesCmb(data.items[0].items);
            UpdateLabelAllCities();

        }
    });
}
function UpdateLabelAllCities() {
    var placename = '';
    if (selCountry = $("#cmbStates option:selected").val() * 1 == -1) {
        placename = $("#cmbCountries option:selected").text();
    }
    else {
        placename = $("#cmbStates option:selected").text();
    }

    
}

function UpdateStatesCmb(result) {
    var options = $("#cmbStates");
    options.empty();

    $.each(result, function () {
        options.append($("<option />").val(this.Value).text(this.Text));
    });

}
function UpdateCitiesCmb(result) {
    var options = $("#cmbCities");
    options.empty();

    $.each(result, function () {
        options.append($("<option />").val(this.Value).text(this.Text));
    });

}