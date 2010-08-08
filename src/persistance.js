Class.Mutators.Persistance = function(options){
  this.model_name = options.resource_name;
  this.persistance = this.uses;
  this.extend(options.uses);
}
// TODO: Handle error conditions
