
function CompareDates(IDCalFrom, IDCalTo) {
    var isError = 0;

    var idMonth = 'ID_cmbMonthes_' + IDCalFrom;
    var monthFrom = $("#" + idMonth + " option:selected").val();
    var idDays = 'ID_cmbDays_' + IDCalFrom;
    var dayFrom = $("#" + idDays + " option:selected").val();

    var dFrom = new Date(getYear(IDCalFrom), monthFrom-1, dayFrom, 0, 0, 0, 0);
    idMonth = 'ID_cmbMonthes_' + IDCalTo;
    var monthTo = $("#" + idMonth + " option:selected").val();

    idDays = 'ID_cmbDays_' + IDCalTo;
    var dayTo = $("#" + idDays + " option:selected").val();

    var dTo = new Date(getYear(IDCalTo), monthTo-1, dayTo, 0, 0, 0, 0);

    if ( dTo > dFrom)
        isError = 1;
    if (dTo < dFrom)
        isError = -1;

    return isError;
}
function UpdateDateTo(CalFromID, CalToID) {
    var yearFrom = getYear(CalFromID);
    var monthFrom = $("#ID_cmbMonthes_"+CalFromID+" option:selected").val();
    var dayFrom = $("#ID_cmbDays_"+CalFromID+" option:selected").val();

    SetCalValue(CalToID, yearFrom, monthFrom, dayFrom);
}
//function RedirectBack(url,personid) {
//    //var url = '@Url.Content("~/AddPersonalData/RedirectEdit?id=__id__")';
//    url = url.replace("__id__", personid);
//    window.location.href = url;
//}