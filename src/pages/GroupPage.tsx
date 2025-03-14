import { Navigate, useParams } from "react-router";
import { Group } from "../lib/entity/Group";
import { useEffect, useState } from "react";
import { getGroup } from "../lib/ApiCalls/GroupApiCalls";
import { FaInfo, FaRegMessage, FaStar, FaUsers, FaWrench } from "react-icons/fa6";
import Button from "../components/Button";
import GroupPostTab from "../components/social/tabs/GroupPostTab";
import GroupMembersTab from "../components/social/tabs/GroupMembersTab";

export default function GroupPage() {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <Navigate to="/groups" />;
    }
    const [group, setGroup] = useState<Group>();
    const [tab, setTab] = useState<"posts" | "members" | "about" | "chat" | "options">("posts");
    useEffect(() => {
        init()
    }, [])
    async function init() {
        const group = await getGroup(id!);
        if (group) {
            setGroup(group);
            console.log(group)
        }
    }
    if (group === undefined) return <p>spinner</p>;
    return (
        <section>
            <div style={{
                backgroundImage: `url(${group.bannerImage})`,

                
            }} className="w-11/12 h-56 secondary flex items-center justify-center mx-auto bg-cover bg-center bg-no-repeat">
                <h1 className="text-6xl text-center  text-white font-bold">{group.alias}</h1>
            </div>
            <article className="secondary p-2 flex-col w-11/12 mx-auto my-2 justify-center">

            <div className=" gap-2 flex flex-row mx-auto">
                <FaUsers className="text-5xl text-primary  secondary rounded-xl  p-1" />
                <span>
                    <h2 className="text-3xl font-bold">{group.name}</h2>
                    <p className="muted">{group.description}</p>
                </span>
            </div>
            <p className="text-lg">{group.description}</p>
            <div className="flex flex-row gap-2 items-center overflow-x-scroll scroll-hidden">
                <Button className={`flex items-center p-0 px-2 py-1 gap-2 tlg ${tab === "posts" ? "bg-highlightSecondary" : "secondary"}`} onClick={() => {setTab("posts")}}>
                    <FaStar className="text-lg" />
                    Posts
                </Button>
                <Button className={`flex items-center p-0 px-2 py-1 gap-2 tlg  ${tab === "members" ? "bg-highlightSecondary" : "bg-backdropSecondary"}`} onClick={() => {setTab("members")}}>
                    <FaUsers className="text-lg" />
                    Members
                </Button>
                <Button className={`flex items-center p-0 px-2 py-1 gap-2 tlg ${tab === "about" ? "bg-highlightSecondary" : "secondary"}`} onClick={() => {setTab("about")}}>
                    <FaInfo className="text-lg" />
                    About
                </Button>
                <Button className={`flex items-center p-0 px-2 py-1 gap-2 tlg ${tab === "chat" ? "bg-highlightSecondary" : "secondary"}`} onClick={() => {setTab("chat")}}>
                    <FaRegMessage className="text-lg" />
                    Chat
                </Button>
                <Button className={`flex items-center p-0 px-2 py-1 gap-2 tlg ${tab === "options" ? "bg-highlightSecondary" : "secondary"}`} onClick={() => {setTab("options")}}>
                    <FaWrench className="text-lg" />
                    Options
                </Button>
            </div>
            {tab === "posts" && <GroupPostTab validMember={group.validMember} tab={tab} id={group.id} />}
            {tab === "members" && <GroupMembersTab validMember={group.validMember} tab={tab} id={group.id} />}
            </article>
        </section>
    )
}