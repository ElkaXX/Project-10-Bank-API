interface ServerResponse {
  status: number;
  message: string;
  body: {
    id: string;
    email: string;
  };
}

export interface Api {
  user: {
    signup: (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => Promise<ServerResponse>;
    login: (data: { email: string; password: string }) => Promise<{
      token: string;
    }>;
    getProfile: (token: string) => Promise<ServerResponse>;
    editProfile: (
      data: { firstName: string; lastName: string },
      token: string
    ) => Promise<ServerResponse>;
  };
}
