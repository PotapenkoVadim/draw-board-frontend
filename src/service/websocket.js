import { configuration } from '@/configuration';
import Toast from '@/service/toast';

export default class WebsocketService {
  constructor() {
    this.socket = new WebSocket(configuration.serverURL);
  }

  open(data, handleMessage, handleError) {
    this.socket.onopen = () => {
      try {
        Toast.success('Connection has run');

        this.send(data);
        this.onMessage(handleMessage);
      } catch (error) {
        Toast.error('request_error');
      }
    };

    this.onError(handleError);
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  onMessage(callback) {
    this.socket.onmessage = callback;
  }

  onError(callback) {
    this.socket.onerror = callback;
  }
}
