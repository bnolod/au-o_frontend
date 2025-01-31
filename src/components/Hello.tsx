import React, { useState } from "react";
import { AuthTexts } from "../constants/texts";

export default function LoginModal({
  language = "EN",
}: {
  language: "HU" | "EN";
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <dialog
          open
          className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-xl text-textColor"
        >
          <div className="bg-background p-8 rounded-xl shadow-lg w-full lg:w-1/3 ">
          <div className="flex items-center justify-between w-full">
            <div className="h-1 basis-1/12"/>
            <h1 className="basis-10/12 text-5xl text-center self-center">
              {AuthTexts.login.heroText[language]}
            </h1>
            <p className="basis-1/12 text-right text-3xl">X</p>

          </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder={AuthTexts.login.labels.email[language]}
                  className="w-full px-4 py-2 rounded bg-highlightSecondary/25"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder={AuthTexts.login.labels.password[language]}
                  className="w-full px-4 py-2 rounded bg-highlightSecondary/25"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 w-full bg-highlightSecondary text-white rounded"
              >
                {AuthTexts.login.confirm[language]}
              </button>
              <p>{AuthTexts.login.notRegistered[language]}</p>
            </form>
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-highlightSecondary text-white rounded"
            ></button>
          </div>
        </dialog>
      )}
    </>
  );
}
