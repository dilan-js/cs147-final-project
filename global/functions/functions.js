export const playAudio = async () => {
console.log("Playing Sound");
    if (current.sound) {
      await current.sound.setStatusAsync({
        shouldPlay: true,
        positionMillis: (current.song.start + progress) * 1000,
      });
      setPlaying(true);
    }
}


export const stopSound = async(current, progress) => {
if (current.sound) {
      await current.sound.setStatusAsync({
        shouldPlay: false,
        positionMillis: (current.song.start + progress) * 1000,
      });
      setPlaying(false);
      console.log("stopped")
    }
}


export default {playAudio, stopSound}