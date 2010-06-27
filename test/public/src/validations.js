MooModel.Validations = new Class({
  errors: function(){
    this.errors = new MooModel.Errors(this)
  },
  valid: function(){
    this.errors.clear();
    _run_validate_callbacks();
    this.error.empty();
  },
  _run_validate_callbacks: function(){
    // javascript being event driven callbacks
    // should in theory be easy enough
  },
  invalid: function(){
    !this.valid();
  }
})