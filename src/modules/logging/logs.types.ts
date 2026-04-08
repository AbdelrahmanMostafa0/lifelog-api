export interface createLogDTO {
  userId: string;
  title: string;
  content: string;
  tags?: string[];
  loggedAt?: Date;
}
