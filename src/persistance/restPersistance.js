MooModel.RestPersistance = {
  create: function(resource, callback){
    this.jsonRequest('post', resource.collection_path(), resource, callback);
  },

  destroy: function(resource, callback){
    this.jsonRequest('delete', resource.resource_path(), resource, callback);
  },

  jsonRequest: function(method, url, resource, callback){
    if(method == 'delete'){
      new Request.JSON({ url: url, onSuccess: callback }).post($merge(resource.attributes.$data, {_method: 'DELETE'}));
    }else if(method == 'update'){
      new Request.JSON({ url: url, onSuccess: callback }).post($merge(resource.attributes.$data, {_method: 'PUT'}));
    }else if(method == 'post'){
      new Request.JSON({ url: url, onSuccess: callback }).post(resource.attributes.$data);
    }
  },

  resource_path: function(resource){
    if(resource.constructor.route == undefined)
      return ['', pluralize(resource.constructor.model_name), resource.id()].join('/');
    else
      return [resource.constructor.route, resource.id()].join('/');
  },

  collection_path: function(resource){
    if(resource.constructor.route == undefined)
      return ['', pluralize(resource.constructor.model_name)].join('/');
    else
      return resource.constructor.route;
  }
};