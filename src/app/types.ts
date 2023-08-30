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
