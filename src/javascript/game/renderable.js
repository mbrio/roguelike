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

goog.provide("game.Renderable");

goog.require("goog.events.EventTarget");

game.Renderable = function() {
	goog.events.EventTarget.call(this);

	this.parent_ = null;
}
goog.inherits(game.Renderable, goog.events.EventTarget);

game.Renderable.prototype.isDrawable = function() {
	return this.getParent() != null;
}

game.Renderable.prototype.getParent = function() {
	return this.parent_;
}

game.Renderable.prototype.setParent = function(parent) {
	this.parent_ = parent;
}

game.GameObject.prototype.getPositionX = goog.abstractMethod;
game.GameObject.prototype.getPositionY = goog.abstractMethod;

game.Renderable.prototype.dispose = function() {
	this.setParent(null);
}

game.Renderable.prototype.render = goog.abstractMethod;
game.Renderable.prototype.step = goog.abstractMethod;