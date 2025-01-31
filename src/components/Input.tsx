import React from "react";
import { AuthTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";

export default function Input({
  labelText = "example",
  inputPlaceholder = "example",
  type, //type
  id,
  isRequired = false
}: {

  type: React.HTMLInputTypeAttribute;
  labelText: string;
  inputPlaceholder: string;
  id?: string;
  isRequired?: boolean;
}) {
  const { language } = useLanguage();
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
        id={id}
        className="rounded-xl bg-highlightSecondary/25 w-full p-3"
        placeholder={inputPlaceholder}
        required={isRequired}
      />
    </div>
  );
}
