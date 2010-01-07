// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Copyright 2010 Michael Diolosa <michael.diolosa@gmail.com>. All Rights Reserved.

goog.provide("game.Group");

goog.require("goog.array");

goog.require("game.GameObject");
goog.require("game.Errors");

game.Group = function() {
	game.GameObject.call(this);
	this.sprites_ = [];
}
goog.inherits(game.Group, game.GameObject);

game.Group.prototype.getSpriteAt = function(i) {
	return this.sprites_[i];
}

game.Group.prototype.addSprite = function(sprite) {
    if (sprite.getParent() != null) game.Errors.spriteHasParent();

	sprite.setParent(this);
	goog.array.insert(this.sprites_, sprite);
}

game.Group.prototype.removeSprite = function(sprite) {
    if (sprite.getParent() != this) game.Errors.spriteDoesNotBelong();

	sprite.setParent(null);
	goog.array.remove(this.sprites_, sprite);
	
	return sprite;
}

game.Group.prototype.moveChildToBack = function(sprite) {
    if (sprite.getParent() != this) game.Errors.spriteDoesNotBelong();

	goog.array.remove(this.sprites_, sprite);
	goog.array.insertAt(this.sprites_, sprite, 0);
}

game.Group.prototype.moveChildBackward = function(sprite) {
    if (sprite.getParent() != this) game.Errors.spriteDoesNotBelong();

	var i = goog.array.indexOf(this.sprites_, sprite);
	
	if (i > 0) {
		goog.array.remove(this.sprites_, sprite);
		goog.array.insertAt(this.sprites_, sprite, i - 1);
	}
}

game.Group.prototype.moveChildForward = function(sprite) {
    if (sprite.getParent() != this) game.Errors.spriteDoesNotBelong();

	var i = goog.array.indexOf(this.sprites_, sprite);
	
	if (i < this.sprites_.length - 1) {
		goog.array.remove(this.sprites_, sprite);
		goog.array.insertAt(this.sprites_, sprite, i + 1);
	}
}

game.Group.prototype.moveChildToFront = function(sprite) {
    if (sprite.getParent() != this) game.Errors.spriteDoesNotBelong();

	goog.array.remove(this.sprites_, sprite);
	goog.array.insertAt(this.sprites_, sprite, this.sprites_.length);
}

game.Group.prototype.render = function(ctx) {
	goog.array.forEach(this.sprites_, function(obj, i, arr) {
		obj.render(ctx);
	});
}

game.Group.prototype.step = function(delta) {
	goog.array.forEach(this.sprites_, function(obj, i, arr) {
		obj.step(delta);
	});
}

game.Group.prototype.dispose = function() {	
	goog.array.forEach(this.sprites_, function(obj, i, arr) {
		obj.dispose();
	});
	
	goog.array.clear(this.sprites_);
	
	game.Group.superClass_.dispose.call(this);
}