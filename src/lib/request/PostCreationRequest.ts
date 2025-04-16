/**
 * Poszt létrehozásának kérésének entitása
 * @category Request
 * @module request/PostCreationRequest
 */
/**
 * A poszt létrehozásához szükséges adatok
 * @interface
 * @see Post
 */
export interface CreatePostRequest {
    /**
   * A poszt készítőjének azonosítója
   * @type {number}
   */
    userId: number;
      /**
   * A poszt leírása
   * @type {string}
   */
    description: string;
      /**
   * A poszthoz tartozó képek
   * @type {string[]}
   */
    images: string[];
      /**
   * A poszt csoport azonosítója
   * @type {number | null}
   */
    groupId: number | null;
      /**
   * A poszt helyszíne
   * @type {string}
   */
    location: string;
      /**
   * A poszthoz tartozó esemény
   * @type {number | null}
   */
    eventId: number | null;
      /**
   * A poszthoz tartozó jármű azonosítója
   * @type {number | null}
   */
    vehicleId: number | null;
  }