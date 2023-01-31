import toast from 'react-hot-toast';
import { configuration } from '@/configuration';

export default class Toast {
  static success(message) {
    toast.success(message, configuration.toast);
  }

  static error(errorCode) {
    toast.error(configuration.errors[errorCode], configuration.toast);
  }
}
