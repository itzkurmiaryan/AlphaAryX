export const getUser = () => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};