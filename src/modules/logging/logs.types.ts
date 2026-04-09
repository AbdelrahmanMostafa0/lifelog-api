export interface createLogDTO {
  userId: string;
  title: string;
  content: string;
  tags?: string[];
  mood?: string;
  loggedAt?: Date;
}
