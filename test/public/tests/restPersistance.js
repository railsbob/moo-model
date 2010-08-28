module("MooModel.RestPersistance");

test('it should return a resource path based on model_name', function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Persistance: { uses: MooModel.RestPersistance, resource_name: 'person' }
  });

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

test('create 200', function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Persistance: { uses: MooModel.RestPersistance, resource_name: 'person' }
  });

  person = new Person({ name: 'anup' });
  same(person.new_record(), true);
  equals(Person.collection.length, 0);

  person.save(function(status){
    test('refreshed instance after create', function(){
      same(person.get('name'), 'moonshine');
      equals(person.id(), 101);
      ok(!person.new_record(), 'record is saved');
      same(Person.find(101), person);
    });
  });
});

test('update 200', function(){
  var Person = new Class({
    Extends: MooModel.Base,
    Persistance: { uses: MooModel.RestPersistance, resource_name: 'person' }
  });

  bob = new Person({ id: 99, name: 'bob' });
  Person.add(bob);
  same(bob.new_record(), false);
  bob.save(function(status){
    test('refreshed instance after update', function(){
      equals(Person.find(99), bob);
      equals(Person.find(99).get('name'), 'sunshine');
    });
  });
});
// 
// test('destroy 200', function(){
//   person = new Person({ id: 90 });
//   person.destroy();
//   // TODO: fix this
// });
// 
// test('create 500', function(){
//   
// });
// 
// test('update 500', function(){
//   
// });
// 
// test('destroy 500', function(){
//   
// });
// 
// test('create 422', function(){
//   
// });
// 
// test('update 422', function(){
//   
// });
// 
// test('destroy 422', function(){
//   
// });
// 
// 
