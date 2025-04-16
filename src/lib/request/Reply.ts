import { apiFetch } from '../apiClient';
import { Reply } from '../entity/Reply';
/**
 * Választ fűz a megadott kommenthez
 * @param commentId Komment azonosítója
 * @param text Válasz szövege
 * @returns {Promise<Reply | null>} Válasz objektum, vagy null, ha a válasz üres
 */
export async function sendReply(commentId: number, text: string): Promise<Reply | null> {
  if (text.length === 0) return null;
  const res = await apiFetch<Reply>(`posts/post/comment/${commentId}/reply`, 'POST', true, {
    text,
  });
  if (res) return res.data;
  return null;
}

export async function deleteReply(replyId: number) {
  const res = await apiFetch<Reply>(`posts/post/comment/reply/${replyId}`, 'DELETE', true);
  if (res?.status === 200) return true;
  else return false;
}