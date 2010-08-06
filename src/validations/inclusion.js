MooModel.Validations.Inclusion = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);

    if(!validation.options.contains(value))
      this.object.errors.add(validation.attribute, validation.message, {});
  }
});