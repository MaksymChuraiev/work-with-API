function fetchApi() {
  const KEY = '59945b492fc64b6089d0f0c74b63952f';
  const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${KEY}`;

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

export { fetchApi };
