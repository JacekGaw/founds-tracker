import type { NotificationType } from "../../store/NotificationContext"
import { NotificationTypeEnum } from "../../store/NotificationContext"
import { motion } from "motion/react";


const Toast: React.FC<{notification: NotificationType}> = ({notification}) => {
    const notificationBorder = notification.type === NotificationTypeEnum.INFO ? "border-info" : notification.type === NotificationTypeEnum.ERROR ? "border-danger" : "border-warning";
    const notificationColor = notification.type === NotificationTypeEnum.INFO ? "bg-info-muted" : notification.type === NotificationTypeEnum.ERROR ? "bg-danger-muted" : "bg-warning-muted";
    return (
        <motion.div initial={{ x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{ x: 100, opacity: 0 }} className={`${notificationBorder} ${notificationColor} py-3 px-4 border-2 flex flex-col gap-1 rounded-xl drop-shadow-lg drop-shadow-black/30 max-w-[400px] w-full`}>
            <div className="text-base font-bold">{notification.title}</div>
            <div className="text-sm font-light">{notification.message}</div>
        </motion.div>
    )
}

export default Toast;