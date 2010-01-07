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

goog.provide("game.GameObject");

goog.require("game.Renderable");

game.GameObject = function() {
	game.Renderable.call(this);
	
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
}
goog.inherits(game.GameObject, game.Renderable);

game.GameObject.prototype.getPositionX = function()
{
	var parent = this.getParent();
	var x = this.x;
	
	if (parent != null) x += parent.getPositionX();
	
	return x;
}

game.GameObject.prototype.getPositionY = function()
{
	var parent = this.getParent();
	var y = this.y;
	
	if (parent != null) y += parent.getPositionY();
	
	return y;
}

game.GameObject.prototype.moveToBack = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveChildToBack(this);
}

game.GameObject.prototype.moveBackward = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveChildBackward(this);
}

game.GameObject.prototype.moveForward = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveChildForward(this);    
}

game.GameObject.prototype.moveToFront = function() {
	var parent = this.getParent();
	if (parent != null) parent.moveChildToFront(this);
}