import { HandCoins } from "lucide-react";

const Logo: React.FC<{
  className?: string;
  size?: number;
  textSize?: string;
}> = ({ className = "", size = 24, textSize = "lg" }) => {
  return (
    <div
      className={`flex items-center gap-1 font-[900] text-text ${className}`}
    >
      <HandCoins size={size} strokeWidth={2} />
      <p className={`text-${textSize}`}>
        <span className="text-primary">Founds</span>
        <span>Track</span>
      </p>
    </div>
  );
};

export default Logo;
