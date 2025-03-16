import { formatNumber } from '../../lib/functions';
import { ReactionButtonProps } from './props';

export default function ReactionButton({
  type = 'FIRE',
  count = 0,
  onClick,
  state = 'inactive',
  initialReactionState,
}: ReactionButtonProps) {
  const disabled = initialReactionState !== null && initialReactionState !== type;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${state === 'active' ? 'bg-highlightPrimary font-semibold dark:bg-highlight-dark' : 'secondary'} ${
        disabled && 'pointer-events-none opacity-25'
      } ${initialReactionState === type} bg-backdrop-secondary cursor-pointer hover:opacity-50 transition-opacity  dark:bg-backdrop-secondary-dark rounded-2xl min-w-12 flex flex-row justify-center align-middle h-12 p-2`}
    >
      <p className="text-xl">
        {type === 'FIRE' && '🔥'}
        {type === 'HEART' && '😍'}
        {type === 'COOL' && '😎'}
      </p>
      <p className="text-xl">{count > 0 && " " + formatNumber(count) }</p>
    </button>
  );
}