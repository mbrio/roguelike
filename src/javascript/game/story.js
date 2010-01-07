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

/*
 * NEED A WAY TO INSTANTIATE/DISPOSE OF SCENES WHEN SET TO CURRENT
 */
goog.provide("game.Story");

goog.require("goog.object");

goog.require("game.Renderable");

game.Story = function() {
	game.Renderable.call(this);
	this.scenes_ = {};
	this.currentScene_ = null;
}
goog.inherits(game.Story, game.Renderable);

game.Story.prototype.getCurrentScene = function() {
	return this.currentScene_;
}

game.Story.prototype.setCurrentSceneByName = function(name) {
	this.setCurrentScene(this.getSceneByName(name));
}

game.Story.prototype.setCurrentScene = function(scene) {
	var prevScene = this.currentScene_;
	this.currentScene_ = scene;
	if (prevScene != null) prevScene.end();
	
	if (this.currentScene_ == null) {
		this.render = goog.nullFunction;
		this.step = goog.nullFunction;
	} else {
		this.currentScene_.begin();
		this.render = this.renderScene;
		this.step = this.stepScene;
	}
}

game.Story.prototype.getPositionX = function() { return 0; }
game.Story.prototype.getPositionY = function() { return 0; }

game.Story.prototype.getSceneByName = function(name) {
	return goog.object.get(this.scenes_, name);
}

game.Story.prototype.addScene = function(scene) {
    if (scene.getParent() != null) game.Errors.spriteHasParent();

	scene.setParent(this);
	goog.object.add(this.scenes_, scene.getName(), scene);
}

game.Story.prototype.removeSceneByName = function(name) {
	return this.removeScene(this.getSceneByName(name));
}

game.Story.prototype.removeScene = function(scene) {
    if (scene.getParent() != this) game.Errors.spriteDoesNotBelong();

	if (scene == this.currentScene_) this.setCurrentScene(null);

	scene.setParent(null);
	goog.object.remove(this.scenes_, scene.getName());
	
	return scene;
}

game.Story.prototype.init = goog.nullFunction;
game.Story.prototype.render = goog.nullFunction;
game.Story.prototype.step = goog.nullFunction;

game.Story.prototype.renderScene = function(ctx) {
	this.currentScene_.render(ctx);
}

game.Story.prototype.stepScene = function(delta) {
	this.currentScene_.step(delta);
}

game.Story.prototype.dispose = function() {	
	this.setCurrentScene(null);
	
	goog.object.forEach(this.scenes_, function(obj, i, arr) {
		obj.dispose();
	});
	
	goog.object.clear(this.scenes_);
	
	game.Story.superClass_.dispose.call(this);
}