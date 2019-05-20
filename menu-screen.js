// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(startMusic) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.startMusic = startMusic;
    this.JSON_PATH = 'https://fullstackccu.github.io/homeworks/hw4/songs.json';
    this.Info = [];
   	this.theme = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space']

    this._load = this._load.bind(this);
    this._onJsonReady = this._onJsonReady.bind(this);
    this._render = this._render.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._selectChange = this._selectChange.bind(this);

    // form submition Listener
    const form = document.querySelector('form');
    form.addEventListener('submit', this._onSubmit);

    // error message Listener
    const text = document.querySelector('#query-input');
	text.addEventListener('input', function() {
	  const error = document.querySelector('#error');
      error.classList.add("inactive");
	})

    // load json
    this._load();
  }

  // TODO(you): Add methods as necessary.

  _onSubmit(e) {
  	e.preventDefault();
  	const input = document.querySelector('#query-input');
  	
  	// random chosen theme
  	var themeValue = input.value;
  	if(input.value == ''){
  		themeValue = this.theme[ Math.floor(Math.random()*this.theme.length) ];
  	}

  	var obj = {
  		songValue : this.url,
  		gifValue : themeValue
  	}
  	console.log(obj);
  	this.startMusic(obj);
  }

  _render() {
  	// render title
    this.select = document.querySelector('#song-selector');
    this.select.innerHTML = '';
    var flag = 1;						// for default selected option
    for (const info in this.Info) {
      //console.log(this.Info[info]);
	  const opt = document.createElement('option');
	  opt.text = this.Info[info].title;
	  opt.value = info;
	  if( flag == 1 ){					// for default selected option
	  	opt.selected = "true";
	  	this.url = this.Info[info].songUrl;
	  	flag = 0;
	  }
	  this.select.append(opt);
    }

    // title eventListener
    this.select.addEventListener('change', this._selectChange);

    // random theme
    const theme = this.theme[ Math.floor(Math.random()*this.theme.length) ];
    const themeInput = document.querySelector('#query-input');
    themeInput.value = theme;

  }

  _selectChange() {
	const index = this.select.selectedIndex;
    this.url = this.Info[this.select.options[index].value].songUrl;
    //console.log(this.url);
  }

  _load() {
    fetch(this.JSON_PATH)
        .then(this._onResponse)
        .then(this._onJsonReady);
  }

  _onJsonReady(json) {
    this.Info = json;
    this._render();
    console.log(this.Info);
  }

  _onResponse(response) {
    return response.json();
  }
}
