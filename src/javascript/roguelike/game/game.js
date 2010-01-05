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
goog.require('goog.graphics.Stroke');
goog.require('goog.graphics.SolidFill');
goog.require('goog.graphics.Font');
goog.require('roguelike.Browser');
goog.require('roguelike.Errors')

roguelike.game.Game = function(container) {	
	this.container_ = container;
	this.graphics_ = null;
	
	this.width_ = 800;
	this.height_ = 600;
	
	this.targetFramerate_ = 100;
	
	this.stepInterval_ = null;
	this.renderInterval_ = null;
	
	this.validate_();
	this.resetFrames_();
	
	this.fonts_ = {
		fps: new goog.graphics.Font(12, "Helvetica Neue,Arial")
	}
	
	this.colors_ = {
		background: new goog.graphics.SolidFill('blue'),
		fps: new goog.graphics.SolidFill('white')
	}
}
goog.inherits(roguelike.game.Game, goog.events.EventTarget);

roguelike.game.Game.prototype.resetFrames_ = function() {
	this.renderDelay_ = 1000 / this.targetFramerate_,
    this.stepDelay_ = 1000 / this.targetFramerate_,

    this.stepDelta_ = 0;
    this.lastStep_ = 0;
	this.stepFps_ = 0;

    this.renderDelta_ = 0;
    this.lastRender_ = 0;
	this.renderFps_ = 0;
}

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
		console.debug("Disposing of a game.");

		this.stop();
		this.resetFrames_();
		if (this.graphics_ != null) this.graphics_.dispose();
		
		this.container_ = null;
		
		this.disposed_ = true;
	}
}

roguelike.game.Game.prototype.init = function() {
	if (!this.isValid()) return;
	
	console.debug("Initializing a new game.");
	
	this.graphics_ = new goog.graphics.CanvasGraphics(this.width_, this.height_);
	this.graphics_.render(this.container_);
}

roguelike.game.Game.prototype.renderCycle_ = function() {
	var game = this;
	var now = new Date().getTime();
	
    this.renderDelta_ = now - this.lastRender_;
	this.renderFps_ = 1000 / this.renderDelta_;

    this.graphics_.clear();
	this.graphics_.drawRect(0, 0, this.width_, this.height_, null, this.colors_.background)
	this.graphics_.drawText(this.renderFps_, 10, 10, 100, 100, 'left', 'top', this.fonts_.fps, null, this.colors_.fps);
	this.graphics_.drawText(this.stepFps_, 10, 30, 100, 100, 'left', 'top', this.fonts_.fps, null, this.colors_.fps);
	
	// do something
	
    this.lastRender_ = now;

    this.renderInterval_ = setTimeout(function() { game.renderCycle_(); }, this.renderDelay_);
}

roguelike.game.Game.prototype.stepCycle_ = function() {
	var game = this;
	var now = new Date().getTime();
	
    this.stepDelta_ = now - this.lastStep_;
	this.stepFps_ = 1000 / this.stepDelta_;

	// do something
	
    this.lastStep_ = now;

    this.stepInterval_ = setTimeout(function() { game.stepCycle_(); }, this.stepDelay_);
}

roguelike.game.Game.prototype.stop = function() {
	if (this.stepInterval_ != null) {
        clearInterval(this.stepInterval_);
        this.stepInterval_ = null;
    }

    if (this.renderInterval_ != null) {
        clearInterval(this.renderInterval_);
        this.renderInterval_ = null;
    }
}

roguelike.game.Game.prototype.start = function() {
	if (!this.isValid()) return;
	
	this.lastStep_ = new Date().getTime();
	this.lastRender_ = new Date().getTime();
	
	this.stepCycle_();
	this.renderCycle_();
}

roguelike.game.Game.init = function(id) {
	var game = new roguelike.game.Game(goog.dom.$(id));
	game.init();
	game.start();
	
	return game;
}