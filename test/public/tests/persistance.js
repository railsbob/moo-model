module("MooModel.Persistance");

test("Persistance", function(){

  var Person = new Class({
    Extends: MooModel.Base,
    Persistance: { uses: MooModel.RestPersistance, resource_name: 'person' }
  });

  test('it should yield the assigned persistance object', function(){
    var person = new Person({ id: 1, name: 'railsbob' });
    same(person.constructor.persistance, MooModel.RestPersistance);
  });
});