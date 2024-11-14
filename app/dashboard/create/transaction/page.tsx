"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormDialog, CreateTransactionForm } from "@/components/dashboard";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const isCreatePage = pathname === "/dashboard/create/transaction";
  const onOpenChange = (open = isCreatePage) => {
    !open && router.back();
  };

  return (
    <div>
      <FormDialog
        requiredRoute={isCreatePage}
        onOpenChange={onOpenChange}
        dialogTitle="Create new transaction"
      >
        <CreateTransactionForm />
      </FormDialog>
    </div>
  );
}
