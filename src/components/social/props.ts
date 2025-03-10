import { Group } from "../../lib/entity/Group";
import { SocialEvent } from "../../lib/entity/SocialEvent";

export interface SocialCardProps {
    language: "HU" | "EN";
    group: Group | null
    event: SocialEvent | null
    type: "GROUP" | "EVENT"
    preview: "DISPLAY" | "PREVIEW"
    onCreateClick: () => void
}
export interface SocialBannerProps {
    name: string;
    id: number;
    header?: boolean;
    image?: string;
    type?: 'GROUP' | 'EVENT';
    onClick?: () => void;
    count?: number | null;
  }
  