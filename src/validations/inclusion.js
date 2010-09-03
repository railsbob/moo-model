/*
  MooModel.Validations.Inclusion
*/

MooModel.Validations.Inclusion = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if(!validation.options.contains(value))
      this.object.errors.add(validation.attribute, (validation.message || 'is not allowed'), {});
  }
});

