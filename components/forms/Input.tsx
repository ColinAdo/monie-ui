import Link from "next/link";
import { ChangeEvent } from "react";

interface Props {
  lableId: string;
  type: string;
  value: string;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export default function Input({
  lableId,
  type,
  value,
  link,
  required = false,
  onChange,
  children,
}: Props) {
  return (
    <div>
      <div className="flex justify-between align-center">
        <label
          htmlFor={lableId}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {children}
        </label>
        {link && (
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            href={link.linkUrl}
          >
            {link.linkText}
          </Link>
        )}
      </div>
      <div className="mt-2">
        <input
          id={lableId}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name={lableId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
}
