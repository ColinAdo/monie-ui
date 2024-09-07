import cn from "classnames";

interface Props {
  provider: "google" | "github";
  children: React.ReactNode;
  [rest: string]: any;
}

export default function SocialButton({ provider, children, ...rest }: Props) {
  const className = cn(
    "flex-1 text-white rounded-md px-3 mt-3 py-2 font-medium",
    {
      "bg-red-500 hover:bg-red-400": provider === "google",
      "bg-slate-500 hover:bg-slate-400": provider === "github",
    }
  );

  return (
    <button className={className} {...rest}>
      <span className="flex justify-start items-center">{children}</span>
    </button>
  );
}
