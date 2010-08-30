MooModel.Validations.Within = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if((value > validation.max) || (value < validation.min))
      this.object.errors.add(validation.attribute, (validation.message || 'out of range'), {});
  }
});
