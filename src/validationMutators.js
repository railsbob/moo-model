// Mutator to define validations
Class.Mutators.Validations = function(validations){
  this.validations = (this.validations || []).extend(validations);
  this.implement(validations);
};

