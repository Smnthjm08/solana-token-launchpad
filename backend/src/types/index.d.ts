interface userRequestTypes {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: userRequestTypes;
    }
  }
}
