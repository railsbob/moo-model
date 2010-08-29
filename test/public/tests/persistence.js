module("MooModel.Persistence");

test("Persistence", function(){

  var Person = new Class({
    Extends: MooModel.Base,
    Persistence: { uses: MooModel.RestPersistence, resource_name: 'person' }
  });

  test('it should yield the assigned persistence object', function(){
    var person = new Person({ id: 1, name: 'railsbob' });
    same(person.constructor.persistence, MooModel.RestPersistence);
  });
});