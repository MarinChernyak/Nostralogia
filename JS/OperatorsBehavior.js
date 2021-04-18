
function OperatorsBehavior(_prefix, _generalName, _leftName, _midName, _rightName) {

    this.IDControl=_prefix + "_" +_generalName;
    this.IDLeft= _prefix+"_"+_leftName+"_"+ _generalName;
    this.IDMid = _prefix + "_" + _midName + "_" + _generalName;
    this.IDRight = _prefix + "_" + _rightName + "_" + _generalName;
    this.IDLeftSelected = _prefix + "_" + _leftName + "Selected_" + _generalName;
    this.IDMidSelected = _prefix + "_" + _midName + "Selected_" + _generalName;
    this.IDRightSelected = _prefix + "_" + _rightName + "Selected_" + _generalName;
    this.SelectedValueName = "SelectedValue"+ "_" +_generalName;
    this.speed = 0;

    this.InitImages();
}

OperatorsBehavior.prototype = {
    InitImages: function () {
        $("#" + this.IDLeftSelected).hide(this.speed);
        $("#" + this.IDMidSelected).hide(this.speed);
        $("#" + this.IDRightSelected).hide(this.speed);
        $("#" + this.IDLeft).show(this.speed);
        $("#" + this.IDMid).show(this.speed);
        $("#" + this.IDRight).show(this.speed);
        this.value = 0;
        $("#" + this.IDControl).data(this.SelectedValueName, 0);
    },
    UpdateByClickLeft: function ( ShouldSelected) {
        this.InitImages();
        if (ShouldSelected) {
            $("#" + this.IDLeft).hide(this.speed);
            $("#" + this.IDLeftSelected).show(this.speed);
            $("#" + this.IDControl).data(this.SelectedValueName, 1);
        }
        else {
            $("#" + this.IDLeftSelected).hide(this.speed);
        }        
    },
    UpdateByClickMid: function (ShouldSelected) {
        this.InitImages();
        if (ShouldSelected) {
            $("#" + this.IDMid).hide(this.speed);
            $("#" + this.IDMidSelected).show(this.speed);
            $("#" + this.IDControl).data(this.SelectedValueName, 2);
        }
        else {
            $("#" + this.IDMidSelected).hide(this.speed);
        }
    },
    UpdateByClickRight: function (ShouldSelected) {
        this.InitImages();
        if (ShouldSelected) {
            $("#" + this.IDRight).hide(this.speed);
            $("#" + this.IDRightSelected).show(this.speed);
            $("#" + this.IDControl).data(this.SelectedValueName, 3);
        }
        else {
            $("#" + this.IDRightSelected).hide(this.speed);
        }
    }
}

function TwoOperatorsOneRemove(_prefix, _generalName, _leftName, _midName, _rightName) {
    var arguments = [_prefix, _generalName, _leftName, _midName, _rightName];
    OperatorsBehavior.apply(this, arguments);


}
TwoOperatorsOneRemove.prototype = Object.create(OperatorsBehavior.prototype);
TwoOperatorsOneRemove.prototype.constructor = TwoOperatorsOneRemove;
TwoOperatorsOneRemove.prototype.UpdateByClickRight= function (indexCriterion) {
    

    var jsonOut = {};
              
    jsonOut['indexCriterion'] = indexCriterion;
    $.ajax({
        type: "POST",
        cache: false,
        url: "/SearchPersonalData/RemoveCriterion",
        data: JSON.stringify(jsonOut),
        contentType: "application/json",
        datatype: "json",
    });
}
