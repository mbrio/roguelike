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

game.GameObject = function() {
	goog.events.EventTarget.call(this);
	
	this.parent_ = null;
}
goog.inherits(game.GameObject, goog.events.EventTarget);

game.GameObject.prototype.getParent = function() {
	return this.parent_;
}

game.GameObject.prototype.setParent = function(parent) {
	this.parent_ = parent;
}

game.GameObject.prototype.render = goog.abstractMethod;
game.GameObject.prototype.step = goog.abstractMethod;

game.GameObject.prototype.dispose = function() {
	this.setParent(null);
}