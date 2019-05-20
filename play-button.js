// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(pause, replay) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.pause = pause;
    this.replay = replay;

    this._pause = this._pause.bind(this);
    this._replay = this._replay.bind(this);

    this.btn = document.querySelector('#btn');
    this.btn.addEventListener('click', this._pause);
  }
  // TODO(you): Add methods as necessary.

  _pause() {
  	console.log('pause');
  	this.pause();
  	this.btn.src = "./images/play.png";
  	this.btn.removeEventListener('click', this._pause);
  	this.btn.addEventListener('click', this._replay);
  }

  _replay() {
  	console.log('replay');
  	this.replay();
  	this.btn.src = "./images/pause.png";
  	this.btn.removeEventListener('click', this._replay);
  	this.btn.addEventListener('click', this._pause);
  }

}
