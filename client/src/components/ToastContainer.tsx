import { createPortal } from "react-dom";
import { useNotificationCtx } from "../store/NotificationContext";
import Toast from "./UI/Toast";
import { AnimatePresence, motion } from "motion/react";


const ToastContainer: React.FC = () => {
    const { notifications } = useNotificationCtx();

    return createPortal(
        <div className="z-[543645456456] w-full h-auto fixed items-end top-0 p-5 flex flex-col gap-2">
            <AnimatePresence>
            {notifications.map(n => <motion.div key={n.id} layout><Toast key={n.id} notification={n} /></motion.div>)}</AnimatePresence></div>

    , document.body as HTMLElement)
}

export default ToastContainer;