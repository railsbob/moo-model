MooModel.Validations.Presence = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if((value == null) || (value == '')){
      this.object.errors.add(validation.attribute, validation.message, {});
    }
  }
});