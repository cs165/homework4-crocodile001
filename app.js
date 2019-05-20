// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this._startMusic = this._startMusic.bind(this);

    this.menu = new MenuScreen(this._startMusic);
    this.music = new MusicScreen();
  }
  // TODO(you): Add methods as necessary.

  _startMusic(obj){
  	this.music._load(obj);
  }
}
