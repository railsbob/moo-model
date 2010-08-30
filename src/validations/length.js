MooModel.Validations.Length = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    if(((this.object.get(validation.attribute) == null) && (validation.allow_null == true)) || ((this.object.get(validation.attribute) == '') && (validation.allow_blank == true)))
      return;
    value = this.object.get(validation.attribute).length;
    if(validation.is != undefined){
      if(value != validation.is)
        add_error(this, validation.message);
    }else if(validation.minimum != undefined){
      if(value < validation.minimum)
        add_error(this, validation.message);
    }else if(validation.maximum != undefined){
      if(value > validation.maximum)
        add_error(this, validation.message);
    }else if(validation.within != undefined){
      if((value > validation.within[1]) || (value < validation.within[0]))
        add_error(this, validation.message);
    }
    add_error = function(object, message){
      object.object.errors.add(validation.attribute, (message || "has invalid length"), {});
    }
  }
});
