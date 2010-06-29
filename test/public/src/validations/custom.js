MooModel.Validations.Custom = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);

    if((validation.required == true) && (value == null))
      this.object.errors.add(validation.attribute, 'is required', {});

    if((value != null) && (value.match(validation.regex) == null)){
      this.object.errors.add(validation.attribute, validation.message, {});
    }
  }
});