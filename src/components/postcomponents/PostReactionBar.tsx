export default function PostReactionBar(){
    return (
        <div className="flex text-xs p-3 justify-start">
        <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg"> 🔥 gomb</button>
        <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg"> 😎 gomb</button>
        <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg"> 😍 gomb</button>
        <div className="justify-self-end flex flex-col flex-grow text-right">
            <p className="text-highlightPrimary">Tilted Towers</p>
            <p>2001.09.11</p>
        </div>
        </div>
    )
}