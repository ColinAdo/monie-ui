"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormDialog, CreateAccountForm } from "@/components/dashboard";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const isCreatePage = pathname === "/dashboard/create";
  const onOpenChange = (open = isCreatePage) => {
    !open && router.back();
  };

  return (
    <div>
      <FormDialog
        requiredRoute={isCreatePage}
        onOpenChange={onOpenChange}
        dialogTitle="Create new post"
      >
        <CreateAccountForm />
      </FormDialog>
    </div>
  );
}
