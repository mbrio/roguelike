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

goog.provide("game.StoryGame");

goog.require("game.Game");
goog.require("game.Story");

game.StoryGame = function(container, opt_story) {
	game.Game.call(this, container);
	
	if (opt_story != null)
		this.story_ = opt_story;
	else
		this.story_ = new game.Story();
		
	this.addSprite(this.story_);
}
goog.inherits(game.StoryGame, game.Game);

game.StoryGame.prototype.getStory = function() {
	return this.story_;
}

game.StoryGame.prototype.init = function() {	
	game.StoryGame.superClass_.init.call(this);
	
	this.story_.init();
}

game.StoryGame.prototype.dispose = function() {
	this.story_ = null;
	
	game.StoryGame.superClass_.dispose.call(this);
}