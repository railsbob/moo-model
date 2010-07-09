MooModel.RestPersistance = {
  create: function(resource, callback){

  },

  destroy: function(resource){

  },

  jsonRequest: function(method, url, resource, callback){

  },

  resource_path: function(resource){
    return ['', pluralize(resource.constructor.model_name), resource.id()].join('/')
  }
};