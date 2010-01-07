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

goog.require("game.StoryGame");
goog.require("game.Story");
goog.require("game.Scene");

goog.require('roguelike.MikeSprite');
goog.require('roguelike.AnnaSprite');
goog.require('roguelike.MainScene');
goog.require('roguelike.BeginScene');
goog.require('roguelike.RogueStory');

roguelike.Roguelike = function(container) {
	game.StoryGame.call(this, container, new roguelike.RogueStory());
	
	this.fonts_ = {
		fps: new goog.graphics.Font(12, "Helvetica Neue,Arial")
	}
	
	this.colors_ = {
		background: new goog.graphics.SolidFill('blue'),
		fps: new goog.graphics.SolidFill('white')
	}
}
goog.inherits(roguelike.Roguelike, game.StoryGame);

roguelike.Roguelike.prototype.render = function(ctx) {
	ctx.drawRect(0, 0, this.width, this.height, null, this.colors_.background)
	ctx.drawText(this.renderFps_, 10, 10, 100, 100, 'left', 'top', this.fonts_.fps, null, this.colors_.fps);
	ctx.drawText(this.stepFps_, 10, 30, 100, 100, 'left', 'top', this.fonts_.fps, null, this.colors_.fps);
	
	roguelike.Roguelike.superClass_.render.call(this, ctx);
}