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

goog.provide("roguelike.Roguelike");

goog.require("goog.events");
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');

goog.require("game.Game");

goog.require('roguelike.MikeSprite');
goog.require('roguelike.AnnaSprite');

roguelike.Roguelike = function(container) {
	game.Game.call(this, container);
	
	this.keyHandler_ = null;
	
	this.fonts_ = {
		fps: new goog.graphics.Font(12, "Helvetica Neue,Arial")
	}
	
	this.colors_ = {
		background: new goog.graphics.SolidFill('blue'),
		fps: new goog.graphics.SolidFill('white')
	}
}
goog.inherits(roguelike.Roguelike, game.Game);

roguelike.Roguelike.prototype.render = function(ctx) {
	ctx.drawRect(0, 0, this.width_, this.height_, null, this.colors_.background)
	ctx.drawText(this.renderFps_, 10, 10, 100, 100, 'left', 'top', this.fonts_.fps, null, this.colors_.fps);
	ctx.drawText(this.stepFps_, 10, 30, 100, 100, 'left', 'top', this.fonts_.fps, null, this.colors_.fps);
	
	roguelike.Roguelike.superClass_.render.call(this, ctx);
}

roguelike.Roguelike.prototype.init = function() {
	roguelike.Roguelike.superClass_.init.call(this);
	
	this.s1 = new roguelike.MikeSprite();
	this.s2 = new roguelike.AnnaSprite();
	this.s2.y = 25;
	this.s2.x = 25;
	this.s3 = new roguelike.MikeSprite();
	this.s3.y = 50;
	this.s3.x = 50;
	this.s4 = new roguelike.MikeSprite();
	this.s4.y = 75;
	this.s4.x = 75;
	this.c = new game.Container();
	this.addSprite(this.c);
	this.c.addSprite(this.s1);
	this.c.addSprite(this.s2);
	
	this.ca = new game.Container();
	this.addSprite(this.ca);
	this.ca.addSprite(this.s3);
	this.ca.addSprite(this.s4);
	
	this.attachEvents();
}

roguelike.Roguelike.prototype.attachEvents = function() {
	this.keyHandler_ = new goog.events.KeyHandler(document);
	var r = this;
	goog.events.listen(this.keyHandler_, 'key', function(e) {
		if (e.keyCode == goog.events.KeyCodes.UP) {
			r.s2.moveForward();
		} else if (e.keyCode == goog.events.KeyCodes.DOWN) {
			r.s2.moveBackward();
		} else if (e.keyCode == goog.events.KeyCodes.LEFT) {
			r.ca.moveToBack();
		} else if (e.keyCode == goog.events.KeyCodes.RIGHT) {
			r.ca.moveToFront();
		}
	});
}

roguelike.Roguelike.prototype.removeEvents = function() {
	if (this.keyHandler_ != null) {
		this.keyHandler_.dispose();
		this.keyHandler_ = null;
	}
}

roguelike.Roguelike.prototype.dispose = function() {
	this.removeEvents();
	
	roguelike.Roguelike.superClass_.dispose.call(this);
}