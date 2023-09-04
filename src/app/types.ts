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

interface MovieIncludeCategory {
  id: string;
  name: string;
  overview: string;
  year: number;
  duration: number;
  cover: {
    secure_url: string;
  };
  categories: [
    {
      name: string;
    },
    {
      name: string;
    }
  ];
}

interface MovieIncludeAll {
  id: string;
  name: string;
  overview: string;
  year: number;
  duration: number;
  cover: {
    secure_url: string;
  };
  categories: Array<{
    name: string;
  }>;
  director: {
    id: string;
    name: string;
    born: number;
    bio: string;
  };
  actors: Array<{
    id: string;
    name: string;
    born: number;
    bio: string;
  }>;
}
