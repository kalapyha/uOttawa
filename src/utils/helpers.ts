export const pathTransform = (path: string): string =>
  path.charAt(1).toUpperCase() + path.slice(2);
export const isValidEmail = (email: string) => {
  return Boolean(
    String(email)
      .toLowerCase()
      .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/g)
  );
};
