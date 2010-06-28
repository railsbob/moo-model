MooModel.Validations = new Class({
  errors: function(){
    this.errors = new MooModel.Errors(this);
    return this.errors;
  },

  valid: function(){
    this.errors.clear();
    _run_validate_callbacks();
    this.error.empty();
  },

  _run_validate_callbacks: function(){
    // javascript being event driven callbacks
    // should in theory be easy enough
    
    // before validation
    // after validation
  },

  invalid: function(){
    !this.valid();
  }
});