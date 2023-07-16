import newMessageAudio from 'assets/iPhone - Message Notification.mp3';

class AudioService {
  newMessage() {
    const audiO = new Audio(newMessageAudio);
    audiO.play();
  }
}

export const audioService = new AudioService();
