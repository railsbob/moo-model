module("MooModel.Base");

var Post = new Class({
  Extends: MooModel.Base,
  
  Validations: {
    name: 'size', required: true, message: "must set the size of the egg"
  }
});

test("initialization", function(){
  var base = new MooModel.Base({ id: 101, title: "Infinity" });
  equals(base.get('title'), "Infinity");
  equals(base.get('id'), 101)
});

test("it should add to collection only once", function(){
  var post = new Post({id: 1, name: "bean", description: "lorem"})
  Post.add(post);
  same(Post.find(1), post);

  Post.add(post);
  equals(Post.collection.length, 1);
});

test("it should remove an element from the collection", function(){
  var post = new Post({id: 1, name: "bob"});
  Post.add(post);
  equals(Post.collection.length, 1);
  post.remove();
  equals(Post.collection.length, 0);
});

test("class methods and instance methods", function(){
  var Nut = new Class({
    Extends: MooModel.Base,

    ClassMethods: {
      speak: function(){
        return 'Hello';
      }
    },

    speak: function(){
      return 'Nut says Hello';
    }
  });

  same(Nut.speak(), 'Hello');
  var bob = new Nut({ name: 'bob' });
  same(bob.speak(), 'Nut says Hello');

  var Duck = new Class({
    Extends: Nut
  });

  same(Duck.speak(), 'Hello');

  var dood = new Duck({ id: 1 });
  same(dood.speak(), 'Nut says Hello');
});

test('Implements', function(){
  var Able = new Class({
    Extends: MooModel.Base,

    hello: function(){
      return 'Hello from a class';
    }
  });

  var Nut = new Class({
    Extends: MooModel.Base,
    Implements: Able
  });

  var nut = new Nut({ id: 1 });

  same(nut.hello(), 'Hello from a class');
});
