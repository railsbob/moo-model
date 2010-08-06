MooModel.Validations.Numericality = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if((value == null) && (validation.required == true))
      this.object.errors.add(validation.attribute, 'is required', {});

    if(isNaN(value))
      this.object.errors.add(validation.attribute, validation.message, {});
  }
});