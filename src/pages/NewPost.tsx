import { Divider } from "@mui/material";
import Card from "../components/Card";
import { FormEvent } from "react";
import PostImage from "../components/postcomponents/PostImage";

export default function PostPage() {

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }
    return (
        <Card>
            <h1 className="text-center text-3xl">New Post</h1>
            <Divider/>
            <section>
                <div>
                    <PostImage images={[]} />
                </div>
                <button className="secondary p-3 w-full rounded-xl mb-2 txl">
                    Fotók feltöltése
                </button>
                    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                        <label htmlFor="text"></label>
                        <textarea className="description mb-2" placeholder="Leírás" name="text" />
                    </form>
            </section>

        </Card>
    )
}