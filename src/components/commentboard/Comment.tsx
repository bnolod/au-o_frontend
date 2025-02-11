import ProfileImage from "../ProfileImage";

// export default function Comment({ replies }: { replies?: boolean }) {
//     return (
//         <div className="w-full">
//             <div className="w-1 bg-backdropSecondary h-full rounded-b"></div>
//             <div className="flex justify-start">
//                 <ProfileImage className="scale-90 aspect-square"></ProfileImage>
//                 <div className="flex flex-col flex-grow">
//                     <h1 className="font-bold">Nev</h1>
//                     <p className="text-xs">@petykes</p>
//                 </div>
//                 <p className="text-xs justify-self-end">2001.09.11</p>
//             </div>
//             <div className="flex flex-col">
//                 <p className="bg-red-400 ml-24">buzi áááááááá</p>
//             </div>
//             <div>
//                 {replies ? (
//                     <div className="flex flex-row">
//                         <div className="w-12 flex-grow flex justify-center">

//                         </div>
//                         <Comment></Comment>
//                     </div>
//                 ) : (
//                     ""
//                 )}
//             </div>
//         </div>
//     );
// }

export default function Comment({ replies }: { replies?: boolean }) {
    return (
        <div className="h-full w-full p-2">
            <div className="flex flex-row">
                <ProfileImage className="aspect-square"></ProfileImage>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col flex-grow">
                        <h1 className="font-bold">Nev</h1>
                        <p className="text-xs">@petykes</p>
                    </div>
                    <p className="text-xs justify-self-end">2001.09.11</p>
                </div>
                <div className="w-1 bg-backdropSecondary h-full rounded-b"></div>
            </div>
            <div className="flex flex-row ml-5">
                {replies && (
                    <div className="w-16 bg-backdropSecondary min-h-full rounded"></div>
                )}
                <div className="flex flex-col">
                    <p className="text-sm break-all pl-6">
                        halihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihóhalihó
                    </p>
                    {replies && (                        
                            <Comment></Comment>
                    )}
                </div>
            </div>
        </div>
    );
}
