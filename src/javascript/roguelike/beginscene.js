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

goog.provide("roguelike.BeginScene");

goog.require("goog.events");
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');

goog.require("game.EventScene");
goog.require("game.Group");

goog.require("roguelike.MikeSprite");
goog.require("roguelike.AnnaSprite");

roguelike.BeginScene = function(name) {
	game.EventScene.call(this, name);
	
	this.keyHandler_ = null;
	
	this.s1 = new roguelike.MikeSprite();

	this.c = new game.Group();
	this.c.addSprite(this.s1);
	this.addSprite(this.c);
}
goog.inherits(roguelike.BeginScene, game.EventScene);

roguelike.BeginScene.prototype.attachEvents = function() {
	this.keyHandler_ = new goog.events.KeyHandler(document);
	var r = this;
	goog.events.listen(this.keyHandler_, 'key', function(e) {
		if (e.keyCode == goog.events.KeyCodes.Q) {
			console.debug('test');
			r.getParent().setCurrentSceneByName("scene1");
		}
	});
}

roguelike.BeginScene.prototype.removeEvents = function() {
	if (this.keyHandler_ != null) {
		this.keyHandler_.dispose();
		this.keyHandler_ = null;
	}
}