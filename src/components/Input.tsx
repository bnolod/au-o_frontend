import React from "react";
import { AuthTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";

export default function Input({
  labelText,
  inputText,
  type, //type
  id,
  isRequired
}: {

  type: React.HTMLInputTypeAttribute;
  labelText: string;
  inputText: string;
  id: string;
}) {
  const { language } = useLanguage();
  return (
    <>
      <label
        htmlFor="{}"
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {AuthTexts.login.labels.email[language]}
      </label>
      <input
        type={type}
        id={id}
        className=" border rounded-full bg-transparent w-full block p-3"
        placeholder={AuthTexts.login.placeholders.email[language]}
        required
      />
    </>
  );
}
