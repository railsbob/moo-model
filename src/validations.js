// Validations Class
MooModel.Validations = new Class({
  errors: function(){
    this.errors = new MooModel.Errors(this);
    return this.errors;
  },

  valid: function(){
    this.errors.clear();
    this._run_validate_callbacks();
    return this.errors.empty();
  },

  _run_validate_callbacks: function(){
    var object = this;
    validations = object.constructor.validations;
    if(validations != undefined){
      $each(validations, function(i){
        switch(i.type){
          case 'presence': (new MooModel.Validations.Presence(object)).validate(i);
          break;
          case 'numericality': (new MooModel.Validations.Numericality(object)).validate(i);
          break;
          case 'custom': (new MooModel.Validations.Custom(object)).validate(i);
          break;
          case 'within': (new MooModel.Validations.Within(object)).validate(i);
          break;
          case 'inclusion': (new MooModel.Validations.Inclusion(object)).validate(i);
          break;
          case 'exclusion': (new MooModel.Validations.Exclusion(object)).validate(i);
          break;
          case 'length': (new MooModel.Validations.Length(object)).validate(i);
          break;
        }
      });
    }
  },

  invalid: function(){
    !this.valid();
  }
});

