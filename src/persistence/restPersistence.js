// REST storage

MooModel.RestPersistence = {
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
    var request_method;

    switch(method){
      case 'delete':
        request_method = 'DELETE';
        break;
      case 'update':
        request_method = 'PUT';
        break;
      case 'post':
        request_method = 'POST';
        break;
    }

    var result = new Request.JSON({
      url: url,
      onSuccess: function(data){
        self.refreshAttributes(result, method, resource, data, callback);
      },
      onFailure: function(data){
        self.refreshAttributes(result, method, resource, data, callback);
      }
    }).post($merge(resource.attributes.$data, { _method: request_method }));

  },

  refreshAttributes: function(request, method, resource, data, callback){

    if(request.status == 200){

      if(method!='delete'){
        $each(data, function(a,b){
          resource.set(b, data[b]);
        });
      }

      object = resource.constructor.find(resource.id());

      if(object!=undefined)
        resource.constructor.remove(object.id());

      if(method!='delete')
        resource.constructor.add(resource);
    }else if(request.status == 422){
      $each(JSON.parse(data.responseText), function(error){
        resource.errors.add(error[0], error[1]);
      });
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