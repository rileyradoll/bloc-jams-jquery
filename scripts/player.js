class Player {
  constructor () {
    this.currentlyPlaying = album.songs[0];
    this.playState = 'stopped';
    this.volume = 80;
    this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
  }

  getDuration() {
    return this.soundObject.getDuration();
  }

  getTime() {
    return this.soundObject.getTime();
  }

  playPause (song = this.currentlyPlaying) {
    if (this.currentlyPlaying !== song) {
      // Stop the currently playing sound file (even if nothing is playing)
      this.soundObject.stop();
      // Clear classes on the song that's currently playing
      this.currentlyPlaying.element.removeClass('playing paused');

      // Update our currentlyPlaying and playState properties
      this.currentlyPlaying = song;
      this.playState = 'stopped';
      this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
    }
    if (this.playState === 'paused' || this.playState === 'stopped') {
      // Checks to see if playState is paused or stopped. If so:
      this.soundObject.setVolume( this.volume );
      // Sets volume to on at default volume
      this.soundObject.play();
      // Begins playing and sets playState to playing
      this.playState = 'playing';
      // Changes class from paused to playing
      this.currentlyPlaying.element.removeClass('paused').addClass('playing');
    } else {
      // If not it will pause the track and change playstate to paused
      this.soundObject.pause();
      this.playState = 'paused';
      // Changes class from playing to paused
      this.currentlyPlaying.element.removeClass('playing').addClass('paused');
    }
  }

  skipTo (percent) {
    // Checks to see if the playstate is not playing
    if (this.playState !== 'playing') { return }
    // Sets the time to where the slider is located along the duration of the song
    this.soundObject.setTime( (percent / 100) * this.soundObject.getDuration() );
  }

  setVolume (percent) {

    this.volume = percent;
    // Current volume level
    this.soundObject.setVolume(percent);
    // Sets new volume
  }
}

const player = new Player();
// Creates player instance
