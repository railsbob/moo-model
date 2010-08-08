MooModel.Validations.Length = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    if(((this.object.get(validation.attribute) == null) && (validation.allow_null == true)) || ((this.object.get(validation.attribute) == '') && (validation.allow_blank == true)))
      return;
    value = this.object.get(validation.attribute).length;
    if(validation.is != undefined){
      if(value != validation.is){
        this.object.errors.add(validation.attribute, (validation.message || "has invalid length"), {});
      }
    }
  }
});