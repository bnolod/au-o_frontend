import { apiFetch } from "../apiClient";
import { Comment } from "../types";
/**
 * Kommentet fűz a megadott poszthoz
 * @param postId Poszt azonosítója
 * @param comment Komment tartalma
 * @returns {Promise<Comment | null>} Komment objektum, vagy null, ha a komment üres
 */
export async function AddCommentToPost(postId: number, comment: string): Promise<Comment | null> {
    if (comment.length === 0) {
      return null;
    }
    const res = await apiFetch<Comment>(`posts/post/${postId}/comment`, 'POST', true, {
      text: comment,
    });
    if (res) return res.data;
    return null;
  }
  export async function DeleteComment(commentId: string): Promise<boolean> {
    const res = await apiFetch(`/posts/post/comment/${commentId}`, 'DELETE', true);
    if (res?.status === 200) return true;
    else return false;
  }