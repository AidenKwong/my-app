import { Request } from "express";

interface User {
  id: string;
  email: string;
}

export class ExpressRequestWithUser extends Request {
  user: User;
}
