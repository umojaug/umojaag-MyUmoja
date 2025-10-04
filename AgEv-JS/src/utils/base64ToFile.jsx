const base64ToFile = (base64String, fileName) => {
  if (!base64String) return null;

  const matches = base64String.match(/^data:(.*);base64,(.*)$/);
  if (!matches || matches.length !== 3) {
      console.error("Invalid base64 string");
      return null;
  }

  const mimeType = matches[1];
  const byteString = atob(matches[2]); // Decode base64
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
  }

  return new File([uint8Array], fileName, { type: mimeType });
};

export default base64ToFile;
