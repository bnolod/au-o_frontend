/**
 * Chat üzenetek típusai
 * @category Request
 * @module request/SocketApi
 */


import { User } from "../entity/User";

/**
 * Chat üzenetek típusa
 * @interface
 *
 */
export interface ChatMessage {
  /**
   * Üzenet
   * @type {string}
   */
  message: string;

  id: number;
  /**
   * Felhasználó adatai
   * @type {object}
   * @property {string} username Felhasználó felhasználóneve
   */
  user: {
    username: string;
  };
  /**
   * Üzenet küldőjének adatai
   * @type {User}
   */
  recipient: User;
}
