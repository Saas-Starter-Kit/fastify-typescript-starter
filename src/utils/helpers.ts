import bcrypt from 'bcrypt';

export const HashedPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

export const CheckPassword = (password: string, hash: string) => {
  const isValid = bcrypt.compareSync(password, hash);
  return isValid;
};
