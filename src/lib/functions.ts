import { User } from "./types";

export function createTimestamp() {
    return new Date().getTime().toString();
  }

export async function createImageForm(image: File, description: string, user: User | null) {
    const imageForm = new FormData();
    imageForm.append('image', image);
    imageForm.append('description', description || '');
    imageForm.append('type', 'file');
    imageForm.append('title', `${user!.username.replace('_', '')}_${createTimestamp()}`);
    console.log(imageForm)
    return imageForm;
  }