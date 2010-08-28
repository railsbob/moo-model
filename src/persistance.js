Class.Mutators.Persistance = function(options){
  this.model_name = options.resource_name;
  this.route = options.route;
  this.persistance = options.uses;
  this.extend(options.uses);
}

