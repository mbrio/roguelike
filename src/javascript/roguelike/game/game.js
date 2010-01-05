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

goog.provide("roguelike.game.Game");
goog.require("goog.dom");

roguelike.game.Game = function(container) {
	if (container == null) throw "The game's containing object could not be found.";
	
	this.container = container;
}

roguelike.game.Game.prototype.init = function() {
	console.info("Initializing a new game.");
}

roguelike.game.Game.init = function(id) {
	var game = new roguelike.game.Game(goog.dom.$(id));
	game.init();
	
	return game;
}