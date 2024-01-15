import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const genSalt = async (): Promise<string> => {
  return genSaltSync(10);
};

export const compare = async (text: string, hash: string): Promise<boolean> => {
  return compareSync(text, hash);
};

export const hashText = async (text: string) => {
  const password = hashSync(text, await genSalt());
  return password;
};

