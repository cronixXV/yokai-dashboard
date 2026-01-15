"use client";

import { useEffect } from "react";

import styles from "./appNotification.module.scss";

interface INotificationProps {
  message: string;
  onClose: () => void;
}

export const AppNotification = ({ message, onClose }: INotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={styles.notification}>{message}</div>;
};
