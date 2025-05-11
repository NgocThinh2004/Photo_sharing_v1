/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url The URL to issue the GET request.
 * @returns {Promise<any>} The parsed JSON data.
 */
async function fetchModel(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const model = await response.json();
    return model;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default fetchModel;
