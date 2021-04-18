function TwoOperatorsBehavior(_prefix, _generalName, _leftName,  _rightName) {

    this.IDControl = _prefix + "_" + _generalName;

    this.IDLeft = _prefix + "_" + _leftName + "_" + _generalName;
    this.IDLeftSelected = _prefix + "_" + _leftName + "Selected_" + _generalName;

    this.IDRight = _prefix + "_" + _rightName + "_" + _generalName;
    this.IDRightSelected = _prefix + "_" + _rightName + "Selected_" + _generalName;

    this.SelectedValueName = "SelectedValue" + "_" + _generalName;
    this.speed = 0;
    this.SelectedValue = 0;

    this.InitImages();
}

TwoOperatorsBehavior.prototype = {
    Init2Images: function () {
        $("#" + this.IDLeftSelected).hide(this.speed);
        $("#" + this.IDRightSelected).hide(this.speed);
        $("#" + this.IDLeft).show(this.speed);
        $("#" + this.IDRight).show(this.speed);

    },
    InitImages: function () {
        
        this.Init2Images();
        this.InitValues();
    },
    InitValues:function(){
        this.SelectedValue = 0;
        $("#" + this.IDControl).data(this.SelectedValueName, this.SelectedValue);

    },
    UpdateByClickLeft: function (ShouldSelected) {
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

function ThreeOperatorsBehavior(_prefix, _generalName, _leftName, _midName, _rightName) {
    this.IDMid = _prefix + "_" + _midName + "_" + _generalName;
    this.IDMidSelected = _prefix + "_" + _midName + "Selected_" + _generalName;

    var arguments = [_prefix, _generalName, _leftName, _rightName];
    TwoOperatorsBehavior.apply(this, arguments);
}
ThreeOperatorsBehavior.prototype = Object.create(TwoOperatorsBehavior.prototype);
ThreeOperatorsBehavior.prototype.constructor = ThreeOperatorsBehavior;

ThreeOperatorsBehavior.prototype.InitImages = function () {
    TwoOperatorsBehavior.prototype.Init2Images.call(this);
    TwoOperatorsBehavior.prototype.InitValues.call(this);
    this.InitThirdImage();
}
ThreeOperatorsBehavior.prototype.InitThirdImage = function () {
    
    $("#" + this.IDMidSelected).hide(this.speed);
    $("#" + this.IDMid).show(this.speed);
}
ThreeOperatorsBehavior.prototype.UpdateByClickMid = function (ShouldSelected) {
    this.InitImages();
    if (ShouldSelected) {
        $("#" + this.IDMid).hide(this.speed);
        $("#" + this.IDMidSelected).show(this.speed);
        $("#" + this.IDControl).data(this.SelectedValueName, 2);
    }
    else {
        $("#" + this.IDMidSelected).hide(this.speed);
    }
}


