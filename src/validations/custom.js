/*
  MooModel.Validations.Custom
*/

MooModel.Validations.Custom = new Class({
  initialize: function(object){
    this.object = object;
  },
  validate: function(validation){
    value = this.object.get(validation.attribute);
    if (((value == null) && (validation.allow_null == true)) || ((value == '') && (validation.allow_blank == true)))
      return;

    if((value != null) && (value.match(validation.regex) == null)){
      this.object.errors.add(validation.attribute, validation.message, {});
    }
  }
});

