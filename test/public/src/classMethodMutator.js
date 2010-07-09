Class.Mutators.ClassMethods = function(methods){
  base_methods = $merge(MooModel.CollectionMethods, MooModel.RestPersistance);
  methods = $merge(base_methods, methods);
  this.__classMethods = $extend(this.__classMethods || {}, methods);
  this.extend(methods);
};

