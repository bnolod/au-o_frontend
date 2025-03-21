import { useEffect, useState } from "react";
import GroupHeader from "../components/social/base/SocialHeader";
import { Group } from "../lib/entity/Group";
import { getAllGroups } from "../lib/ApiCalls/GroupApiCalls";
import SocialCard from "../components/social/base/SocialCard";
import { useLanguage } from "../contexts/LanguageContext";
export default function GroupFeed() {
    const { language } = useLanguage();

    const [groups, setGroups] = useState<Group[]>([]);

    async function getGroups() {
        const res = await getAllGroups()
        if (res) {
            setGroups(res)
        }
    }
    useEffect(() => {
        getGroups()
    }, [])
    return (
        <div className="flex flex-col gap-6">
            <GroupHeader />
        <div className="grid md:grid-cols-2 gap-6">

            {
                groups.map(g => {
                    return (
                        <SocialCard key={g.id} group={g} type="GROUP" language={language} onCreateClick={() => {}} event={null} preview={"DISPLAY"}  />
                    )
                })
            }
        </div>
        </div>

    );
}