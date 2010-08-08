module("MooModel.Validations.Exclusion");

test('It should validate exclusion of attributes', function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'skills', type: 'exclusion', options: ['php'], message: 'is not allowed' }]
  });

  person = new Person({id: 1, skills: 'ror'});
  same(person.valid(), true);

  person.set('skills', 'php');
  same(person.valid(), false);
  same(person.errors.on('skills'), ['is not allowed']);
});

test('It should validate exclusion of attributes optionally', function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'skills', type: 'exclusion', options: ['php'], message: 'is not allowed', allow_null: true }]
  });

  person = new Person({id: 1, skills: null});
  same(person.valid(), true);
});