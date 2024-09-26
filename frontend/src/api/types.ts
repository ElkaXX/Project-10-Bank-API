interface ServerResponse {
  status: number;
  message: string;
  body: {
    id: string;
    email: string;
  };
}

interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  id: string;
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
      status: number;
      message: string;
      body: {
        token: string;
      };
    }>;
    getProfile: (token: string) => Promise<ProfileData>;
    editProfile: (
      data: { firstName: string; lastName: string },
      token: string
    ) => Promise<ServerResponse>;
  };
}
