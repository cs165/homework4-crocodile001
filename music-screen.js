// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.

    this._load = this._load.bind(this);
    this._onJsonReady = this._onJsonReady.bind(this);
    this._play = this._play.bind(this);
    this._pause = this._pause.bind(this);
    this._replay = this._replay.bind(this);
    this._showMusicPage = this._showMusicPage.bind(this);

  }
  // TODO(you): Add methods as necessary.

  _play() {
  	this.audioPlayer = new AudioPlayer();
	this.audioPlayer.setSong(this.obj.songValue);
    this.playButton = new PlayButton(this._pause, this._replay);
	this.gifDisplay = new GifDisplay(this.Info, this._showMusicPage);
	this.audioPlayer.setKickCallback(this.gifDisplay._nextGif);
  }

  _showMusicPage(){
  	const loadingPage = document.querySelector('#loadingPage');
  	loadingPage.classList.add("block");
  	const gifPage = document.querySelector('#gifPage');
  	gifPage.classList.remove("block");

    this.audioPlayer.play();
    this.gifDisplay._nextPreLoad();
  }

  _pause() {
  	this.audioPlayer.pause();
  }

  _replay() {
  	this.audioPlayer.play();
  }


  _load(obj) {

  	this.obj = obj;
  	this.JSON_PATH = 'https://api.giphy.com/v1/gifs/search?q='+ encodeURIComponent(obj.gifValue) +'&api_key=qFQpx2oHsAPyFUSIq3R4aWXZkbBYWDUg&limit=25&rating=g';
  	console.log(this.JSON_PATH);

    fetch(this.JSON_PATH)
        .then(this._onResponse)
        .then(this._onJsonReady);
  }

  _onJsonReady(json) {

    this.Info = json;
    console.log(this.Info);

    // whether less than 2 gifs
    if(this.Info.data.length >= 2){
      const menu = document.querySelector('#menu');
  	  menu.classList.add("block");
  	  const loadingPage = document.querySelector('#loadingPage');
  	  loadingPage.classList.remove("block");
      this._play();
    }
    else{	// show error message
      const error = document.querySelector('#error');
      error.classList.remove("inactive");
    }
  }

  _onResponse(response) {
    return response.json();
  }

}
