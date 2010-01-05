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
goog.require("goog.events");
goog.require("goog.events.EventTarget");
goog.require('goog.graphics.CanvasGraphics');
goog.require('roguelike.Browser');
goog.require('roguelike.Errors')

roguelike.game.Game = function(container) {	
	this.container_ = container;	
	this.validate_();
}
goog.inherits(roguelike.game.Game, goog.events.EventTarget);

roguelike.game.Game.prototype.isValid = function() {
	return this.valid_;
}

roguelike.game.Game.prototype.validate_ = function() {
	if (this.container_ == null) this.invalid_('noContainer');
	else if (!roguelike.Browser.hasCanvas()) this.invalid_('noCanvas');
	else this.valid_ = true;
}

roguelike.game.Game.prototype.invalid_ = function(error) {
	this.valid_ = false;
	
	var output = roguelike.t.Game[error];
	if (output != null) goog.dom.appendChild(this.container_, goog.dom.htmlToDocumentFragment(output()));
			
	var callback = roguelike.Errors[error];
	if (callback != null) callback();
}

roguelike.game.Game.prototype.dispose = function() {
	if (!this.disposed_) {
		this.disposed_ = true;
		console.debug("Disposing of a game.");
	}
}

roguelike.game.Game.prototype.init = function() {
	if (!this.isValid()) return;
	
	console.debug("Initializing a new game.");
}

roguelike.game.Game.init = function(id) {
	var game = new roguelike.game.Game(goog.dom.$(id));
	game.init();
	
	return game;
}