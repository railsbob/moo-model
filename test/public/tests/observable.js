module("MooModel.Base");

var Post = new Class({
  Extends: MooModel.Base
});

var post = new Post({id: 1, name: "bean", description: "lorem"});

test("It should observe set event", function(){
  var changed = false;
  post.set('name', 'bean');
  ok(!changed);
  post.attributes.observeSet('name', function(){
    changed = true;
  });
  post.set('name', 'pulp');
  ok(changed);
});

test("It should observe get event", function(){
  var post = new Post({id: 1, name: "bean", description: "lorem"});
  var changed = false;
  post.get('name');

  ok(!changed);
  post.attributes.observeGet('name', function(){
    changed = true;
  });
  post.get('name');
  ok(changed);
});

test("It should observe erase event", function(){
  var post = new Post({id: 1, name: "bean", description: "lorem"});
  var changed = false;
  post.erase('name');
  ok(!changed);
  post.attributes.observeErase('name', function(){
    changed = true;
  });
  post.erase('name');
  ok(changed);
});

test("It should observe collection add event", function(){
  added = false;

  Post.observeAdd(function(instance){
    added = 'added ' + instance.get('name');
  });
  var post = new Post({id: 1, name: "bean"});


  Post.add(post);
  same(added, 'added bean');
});

test("It should observe collection remove event", function(){
  removed = false;
  Post.observeRemove(function(){
    removed = true;
  });
  var post = new Post({id: 1, name: "bean"});
  Post.add(post);
  
  ok(!removed);
  Post.remove(post.get('id'));

  ok(removed);
});
