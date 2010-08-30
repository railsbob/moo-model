// Provides easy syntax for ClassMethods declaration
Class.Mutators.ClassMethods = function(methods){
  this.__classMethods = $extend(this.__classMethods || {}, methods);
  this.extend(methods);
};

