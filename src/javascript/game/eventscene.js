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

goog.provide("game.EventScene");

goog.require("game.Scene");

game.EventScene = function(name) {
	game.Scene.call(this, name);
}
goog.inherits(game.EventScene, game.Scene);

game.EventScene.prototype.begin = function() {
	game.EventScene.superClass_.begin.call(this);
	
	this.attachEvents();
}

game.EventScene.prototype.end = function() {
	this.removeEvents();
	
	game.EventScene.superClass_.end.call(this);
}

game.EventScene.prototype.addEvents = goog.nullFunction;
game.EventScene.prototype.removeEvents = goog.nullFunction