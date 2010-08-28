// REST storage

MooModel.RestPersistance = {
  create: function(resource, callback){
    this.jsonRequest('post', resource.collection_path(), resource, callback);
  },

  update: function(resource, callback){
    this.jsonRequest('update', resource.resource_path(), resource, callback);
  },

  destroy: function(resource, callback){
    this.jsonRequest('delete', resource.resource_path(), resource, callback);
  },

  jsonRequest: function(method, url, resource, callback){
    var self = this;
    if(method == 'delete'){
      new Request.JSON({
        url: url,
        onSuccess: function(data){
          self.refreshAttributes(resource, data, callback)
        }
      }).post($merge(resource.attributes.$data, { _method: 'DELETE' }));
    }else if(method == 'update'){
      new Request.JSON({
        url: url,
        onSuccess: function(data){
          self.refreshAttributes(resource, data, callback)
        }
      }).post($merge(resource.attributes.$data, { _method: 'PUT' }));
    }else if(method == 'post'){
      new Request.JSON({
        url: url,
        onSuccess: function(data){
          self.refreshAttributes(resource, data, callback)
        }
      }).post(resource.attributes.$data);
    }
  },

  refreshAttributes: function(resource, data, callback){

    $each(data, function(a,b){
      resource.set(b, data[b]);
    });

    object = resource.constructor.find(resource.id());
    if(object == undefined)
      resource.constructor.add(resource);
    else{
      resource.constructor.remove(object.id);
      resource.constructor.add(resource);
    }

    if(callback)
      callback.call(resource);
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