module("MooModel.Base");

var Post = new Class({
  Extends: MooModel.Base
});

var post = new Post({id: 1, name: "bean", description: "lorem"});

test("It should observe set event", function(){
  var changed = '';
  post.set('name', 'bean');
  same(changed, '');
  post.attributes.observeSet('name', function(value){
    changed = 'value changed to ' + value;
  });
  post.set('name', 'pulp');
  equals(changed, 'value changed to pulp');
});

test("It should observe get event", function(){
  var post = new Post({id: 1, name: "bean", description: "lorem"});
  var changed = false;
  post.get('name');

  ok(!changed, 'No change');
  post.attributes.observeGet('name', function(){
    changed = true;
  });
  post.get('name');
  ok(changed, 'Changed');
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
  ok(changed, 'Changed');
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
  removed = '';
  Post.observeRemove(function(instance){
    removed = 'removed post ' + instance.get('id');
  });
  var post = new Post({id: 1, name: "bean"});
  Post.add(post);

  Post.remove(post.get('id'));

  same(removed, 'removed post 1');
});
