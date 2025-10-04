export const extractParts = (input) => {
  const id = input.match(/^\d+/)?.[0] || "";
  const name = input.replace(/^[^-]+-/, "").trim();
  return { id, name };
};