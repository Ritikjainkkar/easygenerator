export const removePassword = (user: any) => {
  if (Array.isArray(user)) {
    return user.map((u) => {
      delete u.password;
      return u;
    });
  } else {
    delete user.password;
    return user;
  }
};