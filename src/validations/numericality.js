MooModel.Validations.Numericality = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);

    if((isNaN(value)) || ((value ==null) && validation.allow_null == false) || ((value == '') && validation.allow_blank == false))
      this.object.errors.add(validation.attribute, (validation.message || 'should be a number'), {});
  }
});
