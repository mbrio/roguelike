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

goog.provide("game.Game");

goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.events.EventTarget");
goog.require('goog.graphics.CanvasGraphics');
goog.require('goog.graphics.Stroke');
goog.require('goog.graphics.SolidFill');
goog.require('goog.graphics.Font');

goog.require('game.Browser');
goog.require('game.Errors')
goog.require('game.Group')

game.Game = function(container) {
	game.Group.call(this);
	
	this.container_ = container;
	this.graphics_ = null;
	
	this.width = 800;
	this.height = 600;
	
	this.targetFramerate_ = 100;
	
	this.stepInterval_ = null;
	this.renderInterval_ = null;
	
	this.validate_();
	this.resetFrames_();
}
goog.inherits(game.Game, game.Group);

game.Game.prototype.getPositionX = function() { return 0; }
game.Game.prototype.getPositionY = function() { return 0; }

game.Game.prototype.resetFrames_ = function() {
	this.renderDelay_ = 1000 / this.targetFramerate_,
    this.stepDelay_ = 1000 / this.targetFramerate_,

    this.stepDelta_ = 0;
    this.lastStep_ = 0;
	this.stepFps_ = 0;

    this.renderDelta_ = 0;
    this.lastRender_ = 0;
	this.renderFps_ = 0;
}

game.Game.prototype.isValid = function() {
	return this.valid_;
}

game.Game.prototype.validate_ = function() {
	if (this.container_ == null) this.invalid_('noContainer');
	else if (!game.Browser.hasCanvas()) this.invalid_('noCanvas');
	else this.valid_ = true;
}

game.Game.prototype.invalid_ = function(error) {
	this.valid_ = false;
	
	var output = game.t.Game[error];
	if (output != null) goog.dom.appendChild(this.container_, goog.dom.htmlToDocumentFragment(output()));
			
	var callback = game.Errors[error];
	if (callback != null) callback();
}

game.Game.prototype.dispose = function() {
	if (!this.disposed_) {	
		console.debug("Disposing of a game.");

		this.stop();
		this.resetFrames_();
		if (this.graphics_ != null) this.graphics_.dispose();
		
		this.container_ = null;
		
		game.Game.superClass_.dispose.call(this);
		this.disposed_ = true;
	}
}

game.Game.prototype.init = function() {
	if (!this.isValid()) return;
	
	console.debug("Initializing a new game.");
	
	this.graphics_ = new goog.graphics.CanvasGraphics(this.width, this.height);
	this.graphics_.render(this.container_);
}

game.Game.prototype.renderCycle_ = function() {
	var g = this;
	var now = new Date().getTime();
	
    this.renderDelta_ = now - this.lastRender_;
	this.renderFps_ = 1000 / this.renderDelta_;

    this.graphics_.clear();

	this.render(this.graphics_);
	
    this.lastRender_ = now;

    this.renderInterval_ = setTimeout(function() { g.renderCycle_(); }, this.renderDelay_);
}

game.Game.prototype.stepCycle_ = function() {
	var g = this;
	var now = new Date().getTime();
	
    this.stepDelta_ = now - this.lastStep_;
	this.stepFps_ = 1000 / this.stepDelta_;

	this.step(this.stepDelta_);
	
    this.lastStep_ = now;

    this.stepInterval_ = setTimeout(function() { g.stepCycle_(); }, this.stepDelay_);
}

game.Game.prototype.stop = function() {
	if (this.stepInterval_ != null) {
        clearInterval(this.stepInterval_);
        this.stepInterval_ = null;
    }

    if (this.renderInterval_ != null) {
        clearInterval(this.renderInterval_);
        this.renderInterval_ = null;
    }
}

game.Game.prototype.start = function() {
	if (!this.isValid()) return;
	
	this.lastStep_ = new Date().getTime();
	this.lastRender_ = new Date().getTime();
	
	this.stepCycle_();
	this.renderCycle_();
}

game.Game.init = function(id, t, opt_args) {
	var g = new t(goog.dom.$(id), opt_args);
	goog.events.listen(window, "unload", function() {
		if (g != null) g.dispose();
	});
	
	g.init();
	g.start();
		
	return g;
}