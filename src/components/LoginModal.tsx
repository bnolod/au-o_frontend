import React, { useState } from "react";
import { AuthTexts } from "../constants/texts";
import Input from "./Input";
import { MdClose } from "react-icons/md";
import { LoginRequest, RegisterRequest } from "../lib/types";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { redirect, replace, useNavigate } from "react-router";
import { validateRegister } from "../lib/Validation/Validation";
import { useSnackbar } from "../contexts/SnackbarContext";

export default function LoginModal({
  language = "EN",
  registerMode = true,
  toggleRegister,
  toggleModal,
  isOpen,
}: {
  language: "HU" | "EN";
  registerMode: boolean;
  toggleRegister: () => void;
  toggleModal: () => void;
  isOpen: boolean;
}) {
  const [formState, setFormState] = useState<RegisterRequest>();
  const { register, login, user } = useAuthentication();
  const {showSnackbar} = useSnackbar();

  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (registerMode) {
      try {
        const request: RegisterRequest = {
          dateOfBirth: "2000-01-01",
          email: formState!.email,
          password: formState!.password,
          nickname: formState!.nickname,
          username: formState!.username,
        };
        console.log(request);
        const validity = validateRegister(
        request.email,
        request.username,
        request.password,
        request.nickname,
        request.password,
        request.dateOfBirth,
        language
      );
      console.log("MESSAGES",validity.messages)
      if (!validity.valid) {
        showSnackbar(validity.messages![0], "error");
        return;
      } else {

        
        const res = await register!(request);
        console.log(res);
        if (res) {
          toggleModal();
          replace("/");
        }
      }
    } catch (e: any) {
      console.log("Please fill out all fields");
      showSnackbar("Please fill out all fields", "error");
    }
    } else {
      const request: LoginRequest = {
        usernameOrEmail: formState!.email,
        password: formState!.password,
      };
      console.log(request);
      const res = await login!(request);
      if (res) {
        toggleModal();
        navigate("/", { replace: true });
      }
    }
  }
  const loginInputs = (
    <>
      
      <Input
        type="text"
        labelText={AuthTexts.login.labels.email[language]}
        value={formState?.email}
        onChange={(e) => {
          setFormState({ ...formState!, email: e.currentTarget.value });
        }}
        inputPlaceholder={AuthTexts.login.placeholders.email[language]}
      />
      <Input
        type="password"
        labelText={AuthTexts.login.labels.password[language]}
        value={formState?.password}
        onChange={(e) => {
          setFormState({ ...formState!, password: e.currentTarget.value });
        }}
        inputPlaceholder={AuthTexts.login.placeholders.password[language]}
      />
    </>
  );

  const registerForm = (
    <>
      <Input
        type="email"
        onChange={(e) => {
          setFormState({ ...formState!, email: e.currentTarget.value });
        }}
        value={formState?.email}
        labelText={AuthTexts.signup.labels.email[language]}
        inputPlaceholder={AuthTexts.signup.placeholders.email[language]}
      />
      <div className="flex gap-4">
        <Input
          type="text"
          onChange={(e) => {
            setFormState({ ...formState!, username: e.currentTarget.value });
          }}
          value={formState?.username}
          labelText={AuthTexts.signup.labels.username[language]}
          inputPlaceholder={AuthTexts.signup.placeholders.username[language]}
        />
        <Input
          type="text"
          onChange={(e) => {
            setFormState({ ...formState!, nickname: e.currentTarget.value });
          }}
          value={formState?.nickname}
          labelText={AuthTexts.signup.labels.nickname[language]}
          inputPlaceholder={AuthTexts.signup.placeholders.nickname[language]}
        />
      </div>
      <div className="flex gap-4">
        <Input
          onChange={(e) => {
            setFormState({ ...formState!, password: e.currentTarget.value });
          }}
          type="password"
          value={formState?.password}
          labelText={AuthTexts.signup.labels.password[language]}
          inputPlaceholder={AuthTexts.signup.placeholders.password[language]}
        />
        <Input
          type="password"
          value={formState?.password}
          labelText={AuthTexts.signup.labels.confirmPassword[language]}
          inputPlaceholder={
            AuthTexts.signup.placeholders.confirmPassword[language]
          }
        />
      </div>
      <div>
        <Input
          type="date"
          value={formState?.dateOfBirth}
          labelText={AuthTexts.signup.labels.dateOfBirth[language]}
          inputPlaceholder={"2000-01-01"}
        />
      </div>
    </>
  );
  if (user) {
    redirect("/");
  }
  return (
    <>
      {isOpen && (
        <dialog
          open
          className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-xl text-textColor z-50"
        >
          <div className="bg-background p-8 rounded-xl relative shadow-lg flex flex-col justify-between w-full lg:w-1/3 ">
            <p
              className="absolute top-0 right-0 right text-3xl p-5"
              onClick={toggleModal}
            >
              <MdClose />
            </p>
            <h1 className="text-5xl text-center">
              {registerMode
                ? AuthTexts.signup.heroText[language]
                : AuthTexts.login.heroText[language]}
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-grow items-center justify-center"
            >
              <div className="flex w-full flex-col basis-2/3 justify-evenly py-10">
                {registerMode ? registerForm : loginInputs}
                {/*errors.length > 0 ? (
                  <div className="pt-3">
                    <div className="text-center bg-highlightPrimary p-3 rounded-xl text-white">
                      {errors[0]}
                    </div>
                  </div>
                ) : (
                  ""
                )*/}
              </div>
              <div className="text-center w-full basis-1/3">
                <button
                  type="submit"
                  className="p-3 w-full bg-highlightSecondary text-white rounded-xl"
                >
                  {AuthTexts.login.confirm[language]}
                </button>
                <p>
              {!registerMode ? AuthTexts.login.notRegistered[language] : AuthTexts.signup.haveAccount[language]}
                  </p>
              </div>
            </form>
            <button className="underline" onClick={() => toggleRegister()}>
              {!registerMode ? AuthTexts.login.confirmTabSwitch[language] : AuthTexts.signup.confirmTabSwitch[language]}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
