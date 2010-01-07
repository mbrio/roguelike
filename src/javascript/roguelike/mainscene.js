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

goog.provide("roguelike.MainScene");

goog.require("goog.events");
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');

goog.require("game.EventScene");
goog.require("game.Group");

goog.require("roguelike.MikeSprite");
goog.require("roguelike.AnnaSprite");

roguelike.MainScene = function(name) {
	game.EventScene.call(this, name);
	
	this.keyHandler_ = null;
	
	this.s1 = new roguelike.MikeSprite();
	this.s2 = new roguelike.AnnaSprite();
	this.s2.y = 25;
	this.s2.x = 25;

	this.c = new game.Group();
	this.c.addSprite(this.s1);
	this.c.addSprite(this.s2);
	this.addSprite(this.c);
	
	this.s3 = new roguelike.MikeSprite();
	this.s3.y = 50;
	this.s3.x = 50;
	this.s4 = new roguelike.MikeSprite();
	this.s4.y = 75;
	this.s4.x = 75;
	
	this.ca = new game.Group();
	this.ca.addSprite(this.s3);
	this.ca.addSprite(this.s4);
	this.addSprite(this.ca);
}
goog.inherits(roguelike.MainScene, game.EventScene);

roguelike.MainScene.prototype.attachEvents = function() {
	this.keyHandler_ = new goog.events.KeyHandler(document);
	var r = this;
	goog.events.listen(this.keyHandler_, 'key', function(e) {
		if (e.shiftKey) {
			if (e.altKey) {
				if (e.keyCode == goog.events.KeyCodes.UP) {
					r.ca.y--;
				} else if (e.keyCode == goog.events.KeyCodes.DOWN) {
					r.ca.y++;
				} else if (e.keyCode == goog.events.KeyCodes.LEFT) {
					r.ca.x--;
				} else if (e.keyCode == goog.events.KeyCodes.RIGHT) {
					r.ca.x++;
				}
			} else {
				if (e.keyCode == goog.events.KeyCodes.UP) {
					r.c.y--;
				} else if (e.keyCode == goog.events.KeyCodes.DOWN) {
					r.c.y++;
				} else if (e.keyCode == goog.events.KeyCodes.LEFT) {
					r.c.x--;
				} else if (e.keyCode == goog.events.KeyCodes.RIGHT) {
					r.c.x++;
				}
			}
		} else {
			if (e.keyCode == goog.events.KeyCodes.UP) {
				r.s2.moveForward();
			} else if (e.keyCode == goog.events.KeyCodes.DOWN) {
				r.s2.moveBackward();
			} else if (e.keyCode == goog.events.KeyCodes.LEFT) {
				r.ca.moveToBack();
			} else if (e.keyCode == goog.events.KeyCodes.RIGHT) {
				r.ca.moveToFront();
			}
		}
	});
}

roguelike.MainScene.prototype.removeEvents = function() {
	if (this.keyHandler_ != null) {
		this.keyHandler_.dispose();
		this.keyHandler_ = null;
	}
}