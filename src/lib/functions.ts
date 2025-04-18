import { NavigateFunction } from 'react-router';
import { User } from './types';

export function createTimestamp() {
  return new Date().getTime().toString();
}
export function getNewButtonLabel(value: 'posts' | 'groups' | 'car' | 'saved'): string {
  switch (value) {
    case 'posts':
      return 'New Post';
    case 'groups':
      return 'New Group';
    case 'car':
      return 'New Vehicle';
    default:
      return '';
  }
}
export function getNewButtonClickEvent(value: 'posts' | 'groups' | 'car' | 'saved', navigate: NavigateFunction): () => void {
  switch (value) {
    case 'posts':
      return () => navigate('/post');
    case 'groups':
      return () => navigate('/groups?post=true');
    default:
      return () => console.log('No action defined');
  }
}
export function createImageForm(image: File, description: string, user: User | null) {
  const imageForm = new FormData();
  imageForm.append('image', image);
  imageForm.append('description', description || '');
  imageForm.append('type', 'file');
  imageForm.append('title', `${user!.username.replace('_', '')}_${createTimestamp()}`);
  console.log(imageForm);
  return imageForm;
}
export function formatNumber(number: number, language?: 'HU' | 'EN') {
  const lang = language || 'EN';
  if (number < 1000) {
    return number.toString();
  }
  const suffix = {
    EN: ['K', 'M', 'B', 'T'],
    HU: ['E', 'M', 'Mrd', 'B'],
  };
  let i = -1;
  let formatted = number;

  while (formatted >= 1000) {
    formatted /= 1000;
    i++;
  }
  return formatted >= 100 ? Math.round(formatted) + suffix[lang][i] : formatted.toFixed(1) + suffix[lang][i];
}
export function getAspectRatio(width: number, height: number) {
  const ratio = width / height;
  if (ratio > 1.5) return 'aspect-[3/2]'; // Wide
  if (ratio < 0.67) return 'aspect-[6/8]'; // Tall
  return 'aspect-[6/7]'; // Medium
}
