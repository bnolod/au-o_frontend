
export interface CreatePostRequest {
    userId: number;
    description: string;
    images: string[];
    groupId: number | null;
    location: string;
    eventId: number | null;
    vehicleId: number | null;
  }