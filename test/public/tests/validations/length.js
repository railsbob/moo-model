test("It should validate length for a particular value", function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'name', type: 'length', is: 14  }]
  });

  person = new Person({id: 1, name: 'Attila the Hun'});
  same(person.valid(), true);
});

test("It should validate length with allow_null", function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'name', type: 'length', is: 14, allow_null: true  }]
  });

  person = new Person({id: 1, name: null});
  same(person.valid(), true);
});

test("It should validate length with allow_blank", function(){
  var Person = new Class({
    Extends: MooModel.Base,

    Validations: [{ attribute: 'name', type: 'length', is: 14, allow_blank: true  }]
  });

  person = new Person({id: 1, name: ''});
  same(person.valid(), true);
});

test("It should validate length using minimum", function(){
  same(true, false)
});

test("It should validate length using maximum", function(){
  same(true, false)
});

test("It should validate length within a given range", function(){
  same(true, false)
});

test("It should optionally validate length using minimum", function(){
  same(true, false)
});

test("It should optionally validate length using maximum", function(){
  same(true, false)
});

test("It should optionally validate length within a given range", function(){
  same(true, false)
});

test("It should optionally validate length for a particular value", function(){
  same(true, false)
});