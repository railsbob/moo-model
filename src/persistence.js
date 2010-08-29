Class.Mutators.Persistence = function(options){
  this.model_name = options.resource_name;
  this.route = options.route;
  this.persistence = options.uses;
  this.extend(options.uses);
}

