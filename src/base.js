MooModel.Base = new Class({
  ClassMethods: $merge(MooModel.CollectionMethods, MooModel.RestPersistance),
  Implements: [MooModel.Validations, MooModel.InstanceMethods],

  Validations: {}
});
