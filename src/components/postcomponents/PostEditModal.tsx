import { useState } from 'react';
import { EditPostRequest } from '../../lib/types';
import { Post } from '../../lib/entity/Post';
import { MdDescription, MdLocationPin } from 'react-icons/md';

export default function PostEditModal({ post }: { post: Post }) {
  const [formState, setFormState] = useState<EditPostRequest>({
    carId: post.vehicle?.id || null,
    location: post.location,
    text: post.text,
  });
  return (
    <>
      <div className="flex flex-col w-11/12 gap-2 items-center">
        <h3 className="txl">Edit Post</h3>
        <br />
        <span className="w-full">
          <label className="tlg flex items-center gap-2">
            <MdDescription size={20} />
            Text
          </label>
          <input
            value={formState.text}
            onChange={(e) => setFormState({ ...formState, text: e.currentTarget.value })}
            type="text"
            placeholder="Description"
            className="w-full bg-backdropSecondary p-2 my-1 rounded-xl"
          />
        </span>
        <span className="w-full">
          <label className="tlg flex items-center gap-2">
            <MdLocationPin size={20} />
            Location
          </label>
          <input
            value={formState.location}
            onChange={(e) => setFormState({ ...formState, location: e.currentTarget.value })}
            type="text"
            placeholder="Location"
            className="w-full bg-backdropSecondary p-2 my-1 rounded-xl"
          />
        </span>
        <button onClick={() => {}}>Vehicle</button>
      </div>
    </>
  );
}
