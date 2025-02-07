import React from "react";

export default function Input({
  labelText = "example",
  inputPlaceholder = "example",
  type, //type
  id,
  isRequired = false,
  value = "",
  onChange
}: {

  type: React.HTMLInputTypeAttribute;
  labelText: string;
  inputPlaceholder: string;
  value?: string;
  id?: string;
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

  return (
    <div className="pt-3 w-full">
      <label
        htmlFor="{}"
        className="text-sm font-medium"
      >
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        id={id}
        onChange={onChange}
        className="rounded-xl bg-highlightSecondary/25 w-full p-3"
        placeholder={inputPlaceholder}
        required={isRequired}
      />
    </div>
  );
}
