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

goog.provide("game.Scene");

goog.require("game.Group");

game.Scene = function(name) {
	game.Group.call(this);
	
	this.name_ = name;
	this.running_ = false;
}
goog.inherits(game.Scene, game.Group);

game.Scene.prototype.getName = function() {
	return this.name_;
}

game.Scene.prototype.begin = function() {
	this.running_ = true;
}

game.Scene.prototype.end = function() {
	this.running_ = false;
}

game.Scene.prototype.dispose = function() {
	if (this.running_) this.end();
	
	game.Scene.superClass_.dispose.call(this);
}