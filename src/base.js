MooModel.Base = new Class({
  Implements: [MooModel.Validations, MooModel.InstanceMethods],
  ClassMethods: $merge(Events.prototype, MooModel.CollectionMethods),
  Validations: {}
});
