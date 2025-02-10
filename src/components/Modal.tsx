import React, { Children, ReactNode, useState } from "react";
import { AuthTexts } from "../constants/texts";
import Input from "./Input";
import { MdClose } from "react-icons/md";
import { LoginRequest, RegisterRequest } from "../lib/types";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { redirect, replace } from "react-router";

export default function LoginModal({
  language = "EN",
  toggleModal,
  isOpen
}: {
  language: "HU" | "EN";
  registerMode: boolean;
  toggleModal: () => void;
  isOpen:boolean;

}) {  
  
  return (
    <>
      {isOpen && (
        <dialog
          open
          className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-transparent backdrop-blur-xl text-textColor"
        >
          <div className="bg-background p-8 rounded-xl relative shadow-lg flex flex-col justify-between w-full lg:w-1/3 ">
            <p className="absolute top-0 right-0 right text-3xl p-5" onClick={toggleModal}><MdClose/></p>
            {/*what*/}
            
          </div>
        </dialog>
      )}
    </>
  );
}
