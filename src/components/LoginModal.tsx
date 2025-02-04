import React, { useRef, useState } from "react";
import { AuthTexts } from "../constants/texts";
import { Link } from "react-router";
import Input from "./Input";
import { MdClose } from "react-icons/md";

export default function LoginModal({
  language = "EN",
  registerMode = true,
  toggleRegister,
  toggleModal,
  isOpen
}: {
  language: "HU" | "EN";
  registerMode: boolean;
  toggleRegister: () => void;
  toggleModal: () => void;
  isOpen:boolean;
}) {
  const loginInputs = (
    <>
      <Input
        type="email"
        labelText={AuthTexts.login.labels.email[language]}
        inputPlaceholder={AuthTexts.login.placeholders.email[language]}
      />
      <Input
        type="password"
        labelText={AuthTexts.login.labels.password[language]}
        inputPlaceholder={AuthTexts.login.placeholders.password[language]}
      />
    </>
  );

  const registerForm = (
    <>
      <Input
        type="email"
        labelText={AuthTexts.signup.labels.email[language]}
        inputPlaceholder={AuthTexts.signup.placeholders.email[language]}
      />
      <div className="flex">
        <Input
          type="text"
          labelText={AuthTexts.signup.labels.username[language]}
          inputPlaceholder={AuthTexts.signup.placeholders.username[language]}
        />
        <Input
          type="text"
          labelText={AuthTexts.signup.labels.nickname[language]}
          inputPlaceholder={AuthTexts.signup.placeholders.nickname[language]}
        />
      </div>
      <div className="flex">
        <Input
          type="password"
          labelText={AuthTexts.signup.labels.password[language]}
          inputPlaceholder={AuthTexts.signup.placeholders.password[language]}
        />
        <Input
          type="password"
          labelText={AuthTexts.signup.labels.confirmPassword[language]}
          inputPlaceholder={AuthTexts.signup.placeholders.confirmPassword[language]}
        />
      </div>

    </>
  );

  return (
    <>
      {isOpen && (
        <dialog
          open
          className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-xl text-textColor"
        >
          <div className="bg-background p-8 rounded-xl relative shadow-lg flex flex-col justify-between w-full lg:w-1/3 ">
            <p className="absolute top-0 right-0 right text-3xl p-5" onClick={toggleModal}><MdClose/></p>
            <h1 className="text-5xl text-center">
              {registerMode
                ? AuthTexts.signup.heroText[language]
                : AuthTexts.login.heroText[language]}
            </h1>

            <form className="flex flex-col flex-grow items-center justify-center">
              <div className="flex w-full flex-col basis-2/3 justify-evenly py-10">
                {registerMode ? registerForm : loginInputs}
              </div>
              <div className="text-center w-full basis-1/3">
                <button
                  type="submit"
                  className="p-3 w-full bg-highlightSecondary text-white rounded-xl"
                >
                  {AuthTexts.login.confirm[language]}
                </button>
                <p>{AuthTexts.login.notRegistered[language]}</p>
                <button className="underline" onClick={toggleRegister}>
                  {AuthTexts.login.confirmTabSwitch[language]}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}
