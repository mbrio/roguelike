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

goog.provide("game.DrawableObject");
goog.require("game.GameObject");
goog.require("game.Errors");

game.DrawableObject = function() {
	game.GameObject.call(this);
	
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
}
goog.inherits(game.DrawableObject, game.GameObject);

game.DrawableObject.prototype.isDrawable = function() {
	return this.getParent() != null;
}

game.DrawableObject.prototype.moveToBack = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveToBack(this);
}

game.DrawableObject.prototype.moveBackward = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveBackward(this);
}

game.DrawableObject.prototype.moveForward = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveForward(this);    
}

game.DrawableObject.prototype.moveToFront = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveToFront(this);
}
