export interface ReactionButtonProps {
    type: 'FIRE' | 'HEART' | 'COOL';
    count: number;
    onClick: () => void;
    state: 'active' | 'inactive';
    initialReactionState: null | 'FIRE' | 'HEART' | 'COOL';
}