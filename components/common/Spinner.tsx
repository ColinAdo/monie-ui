import cn from "classnames";
import { ImSpinner3 } from "react-icons/im";

interface Props {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
}

export default function Spinner({ sm, md, lg }: Props) {
  const className = cn("animate-spin text-white-300 fill-white-300 mr-2", {
    "w-4 h-4": sm,
    "w-6 h-6": md,
    "w-8 h-8": lg,
  });
  return (
    <div role="status" className="text-green-500">
      <ImSpinner3 className={className} />
    </div>
  );
}
