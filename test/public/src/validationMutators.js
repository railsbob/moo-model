Class.Mutators.Validations = function(validations){
  this.validations = (this.validations || []).extend(validations);
  this.implement(validations);
};
