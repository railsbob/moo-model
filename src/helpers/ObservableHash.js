/*
Script: ObservableHash.js
	A Hash, but observable!

License:
	MIT-style license.

Copyright:
	Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com).

*/


var ObservableHash = new Class({
	
	Extends:HashClass,
	Implements:Events
	
});
ObservableHash.implement(ObservableData);
