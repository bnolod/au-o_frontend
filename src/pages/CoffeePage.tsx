import { useState } from "react";
import DecoratedSection from "../components/DecoratedSection";
import NavBar from "../components/NavBar";
import LoginModal from "../components/Hello";

export default function CoffeePage() {
    return (
        <>
        <DecoratedSection navigation={<NavBar/>} innerClassName="justify-center">
            <div className="flex w-1/2 h1/2">
            <LoginModal/>
            </div>
        </DecoratedSection>
        </>
    )
}