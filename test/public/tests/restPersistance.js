module("MooModel.RestPersistance");

var Person = new Class({
  Extends: MooModel.Base,
  Persistance: { uses: MooModel.RestPersistance, resource_name: 'person' }
});

test('REST persistance: it should return a resource path based on model_name', function(){
  person = new Person({id: 1});
  same(person.resource_path(), '/people/1');
});

test('REST persistance: create', function(){
  person = new Person({ name: 'anup', nickname: 'railsbob' });
  same(person.new_record(), true);
  person.save(function(status){
  });
  // TODO: fix this
});

test('REST persistance: destroy', function(){
  person = new Person({ id: 90 });
  person.destroy();
  // TODO: fix this
});
