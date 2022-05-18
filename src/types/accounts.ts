export type Account = {
  id: string;
  category: string;
  name: string;
  tasks: string[];
  accessToken: string;
};

export type Accounts = {
  [key: string]: Account;
};
