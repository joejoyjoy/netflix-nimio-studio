interface UserSession {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

type InitialValue =
  | {
      name: string;
      overview: string;
      year: number;
      duration: number;
      cover: {
        public_id: string;
        secure_url: string;
      };
    }
  | {
      name: string;
      born: number;
      bio: string;
    }
  | {
      name: string;
    }
  | {
      name: string;
      born: number;
      bio: string;
    };
