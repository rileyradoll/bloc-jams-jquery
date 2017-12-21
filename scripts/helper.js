class Helper {
  playPauseAndUpdate(song) {
    player.playPause(song);
    $('.total-time').text(player.prettyTime(song.duration));
  }
}
const helper = new Helper();
