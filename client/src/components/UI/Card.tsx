import type { ReactNode } from "react";

const Card: React.FC<{children: ReactNode, className?: string}> = ({children, className = ""}) => {

    return (
        <div className={`rounded-md bg-bg-light border border-bg-dark p-5 drop-shadow-lg drop-shadow-slate-100 ${className}`}>
            {children}
        </div>
    )
}

export default Card;