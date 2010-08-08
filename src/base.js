MooModel.Base = new Class({
  ClassMethods: $merge(MooModel.CollectionMethods),
  Implements: [MooModel.Validations, MooModel.InstanceMethods],
  Validations: {}
});
