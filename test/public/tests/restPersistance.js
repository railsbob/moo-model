test('REST persistance', function(){

  var Person = new Class({
    Name: 'person',
    Extends: MooModel.Base,
    ClassMethods: MooModel.Base.__classMethods
  });

  person = new Person({id: 1});

  same(person.resource_path(), 'people/1')
});