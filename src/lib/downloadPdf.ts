// lib/downloadUtils.js

/**
 * Triggers a browser download for a Blob object.
 * @param {Blob} blob - The Blob data to download (e.g., a PDF, image, etc.).
 * @param {string} fileName - The desired filename for the downloaded file.
 */
export const downloadBlob = (blob:Blob, fileName:string) => {
  // Create a URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor (`<a>`) element
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName; // Set the file name for the download prompt

  // Append the link to the body, click it, and then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release the object URL after a short delay to ensure the download has started
  setTimeout(() => URL.revokeObjectURL(url), 100);
};