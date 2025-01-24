import { useState } from "react";
import DecoratedSection from "../components/DecoratedSection";
import NavBar from "../components/NavBar";

const [coffeeNumber, setCoffeeNumber] = useState(0);




export default function CoffeePage() {
    return (
        <>
        <DecoratedSection navigation={<NavBar/>} innerClassName="justify-center">
            <div className="flex w-1/2 h1/2">

            </div>
        </DecoratedSection>
        </>
    )
}