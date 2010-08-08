module("MooModel.Validations.Inclusion");

test('It should validate inclusion of attributes', function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'skills', type: 'inclusion', options: ['ror', 'mongo'], message: 'is not allowed' }]
  });

  person = new Person({id: 1, skills: 'ror'});
  same(person.valid(), true);

  person.set('skills', 'php');
  same(person.valid(), false);
  same(person.errors.on('skills'), ['is not allowed']);
});