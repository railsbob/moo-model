module("MooModel.RestPersistance");

var Person = new Class({
  Extends: MooModel.Base,
  Persistance: { uses: MooModel.RestPersistance, resource_name: 'person' }
});

test('it should return a resource path based on model_name', function(){
  person = new Person({id: 1});
  same(person.resource_path(), '/people/1');
});

test('it should accept a manual resource path', function(){
  var Dude = new Class({
    Extends: MooModel.Base,
    Persistance: { uses: MooModel.RestPersistance, resource_name: 'dude', route: '/employees' }
  });

  dood = new Dude({ id: 10 });
  same(dood.resource_path(), '/employees/10');

  same(dood.collection_path(), '/employees');
});

test('create', function(){
  person = new Person({ name: 'anup', nickname: 'railsbob' });
  same(person.new_record(), true);
  person.save(function(status){
  });
  // TODO: fix this
});

test('destroy', function(){
  person = new Person({ id: 90 });
  person.destroy();
  // TODO: fix this
});
