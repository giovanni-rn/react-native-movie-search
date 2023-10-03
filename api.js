export const searchMovies = async (query) => {
  const url = `https://imdb8.p.rapidapi.com/title/find?q=${query}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
};
