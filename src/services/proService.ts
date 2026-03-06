export const isProUser = () => {
  return localStorage.getItem("pro_sub") === "true";
};

