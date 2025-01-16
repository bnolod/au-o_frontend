import Header from "./Header";

export default function Landing(){
    return (
        <>
            <Header></Header>
            <main className="w-screen flex flex-column overflow:none">

            
            <section className="basis-full sm:basis-1/3" >
                <h1 className="text-7xl">The new best way to socialize for car enthusiasts</h1>
                <hr className="my-10"/>
                <button className="bg-highlight rounded w-full h-10 text-white">Log in</button>
                <p className="mt-10 text-center">Access the platform anywhere on your mobile device</p>
                <div className="flex w-full">
                <img className="w-1/2" src="assets/apple.svg" alt="" />
                <img className="w-1/2" src="assets/android.svg" alt="" />
                </div>
            </section>


            {/* <section className="basis-full sm:basis-2/3 flex items-center justify-center"> */}
                <img className="basis-full sm:basis-2/3 " src="assets/FrontDecoration.svg" alt="" />
            {/* </section> */}


            </main>
        </>
    )
}