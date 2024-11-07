import { RequireAuth } from "@/components/utils";
import { Navbar, Sidebar } from "@/components/common";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <RequireAuth>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="p-5 w-full max-w-[1140px]">{children}</div>
      </div>
    </RequireAuth>
  );
}
