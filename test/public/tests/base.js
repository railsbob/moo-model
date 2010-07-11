module("MooModel.Base");

var Post = new Class({
  Name: 'post',
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
