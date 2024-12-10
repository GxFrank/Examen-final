export interface Activity {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  activities: Activity[];
}