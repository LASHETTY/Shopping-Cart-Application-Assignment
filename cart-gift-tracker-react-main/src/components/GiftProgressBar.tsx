
import { Progress } from "@/components/ui/progress";

type GiftProgressBarProps = {
  currentAmount: number;
  threshold: number;
};

const GiftProgressBar = ({ currentAmount, threshold }: GiftProgressBarProps) => {
  const progressPercentage = Math.min((currentAmount / threshold) * 100, 100);
  const amountRemaining = threshold - currentAmount;

  return (
    <div className="p-4 bg-blue-50 rounded-md">
      <div className="text-sm text-blue-700 mb-2">
        Add ₹{amountRemaining} more to get a FREE Wireless Mouse!
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default GiftProgressBar;
