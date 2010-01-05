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

goog.provide("roguelike.MikeSprite");

goog.require("goog.graphics.SolidFill");

goog.require("game.Sprite");

roguelike.MikeSprite = function() {
	game.Sprite.call(this);
	
	this.width = 100;
	this.height = 100;
}
goog.inherits(roguelike.MikeSprite, game.Sprite);

roguelike.MikeSprite.prototype.render = function(ctx) {
	ctx.drawRect(this.x, this.y, this.width, this.height, null, new goog.graphics.SolidFill('green'));
}

roguelike.MikeSprite.prototype.step = function(delta) {
	
}