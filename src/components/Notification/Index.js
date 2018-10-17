import { notification } from 'antd';

export function Notification(type, message, description) {
      // console.info('notification.type ===', type)
      notification[type]({
            message: message,
            description: description,
      });
};

