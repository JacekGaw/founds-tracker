import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface NotificationContextProps {
  notifications: NotificationType[];
  addNotification: (data: NewNotificationType) => void;
  removeNotification: (id: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);

export enum NotificationTypeEnum {
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}
const NOTIFICATION_TYPE_DEFAULT = NotificationTypeEnum.INFO;
const NOTIFICATION_DURATION_DEFAULT = 5000;

export type NotificationType = {
  id: string;
  title: string | ReactNode;
  message: string | ReactNode;
  type?: NotificationTypeEnum;
  duration?: number;
};

export type NewNotificationType = {
  title: string | ReactNode;
  message: string | ReactNode;
  type?: NotificationTypeEnum;
  duration?: number;
};

export const useNotificationCtx = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "Notification Context must be used within an NotificationContextProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    notifications.forEach((notification) => {
      const timeoutId = setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration);
      return () => clearTimeout(timeoutId);
    });
  }, [notifications]);

  const addNotification = (notificationData: NewNotificationType) => {
    setNotifications((pN) => {
      const notificationId = crypto.randomUUID();
      const newNotification = {
        id: notificationId,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type ?? NOTIFICATION_TYPE_DEFAULT,
        duration: notificationData.duration ?? NOTIFICATION_DURATION_DEFAULT,
      };
      return [...pN, newNotification];
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((p) => p.filter((p) => p.id !== id));
  };

  const ctxValue = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={ctxValue}>
      {children}
    </NotificationContext.Provider>
  );
};
