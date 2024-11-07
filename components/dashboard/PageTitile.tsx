interface TitleProps {
  title: string;
  className?: string;
}

export default function PageTitle({ title, className }: TitleProps) {
  return <h1 className="text-2xl font-semibold w-full">{title}</h1>;
}
