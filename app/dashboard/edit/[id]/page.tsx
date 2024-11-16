"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormDialog, EditAccountForm } from "@/components/dashboard";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const isCreatePage = pathname === "/dashboard/edit/e";
  const onOpenChange = (open = isCreatePage) => {
    !open && router.back();
  };

  return (
    <div>
      <FormDialog
        requiredRoute={isCreatePage}
        onOpenChange={onOpenChange}
        dialogTitle="Edit account"
      >
        <EditAccountForm />
      </FormDialog>
    </div>
  );
}
