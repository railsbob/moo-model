var Person = new Class({
  Extends: MooModel.Base,
  Name: 'person'
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
  
});

test('REST persistance: destroy', function(){
  
});

