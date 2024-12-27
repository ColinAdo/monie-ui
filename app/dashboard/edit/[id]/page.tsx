"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormDialog, EditAccountForm } from "@/components/dashboard";
import { useRetrieveAccountsQuery } from "@/redux/features/accountSlice";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: account } = useRetrieveAccountsQuery(id);

  const isEditPage = pathname === `/dashboard/edit/${id}`;
  const onOpenChange = (open = isEditPage) => {
    !open && router.back();
  };

  if (!account) {
    return
  }

  return (
    <div>
      <FormDialog
        requiredRoute={isEditPage}
        onOpenChange={onOpenChange}
        dialogTitle="Edit account"
      >
        <EditAccountForm account={account} />
      </FormDialog>
    </div>
  );
}
