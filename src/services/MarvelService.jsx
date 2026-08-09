class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      "https://marvel-server-zeta.vercel.app/characters?apikey=d4eecb0c66dedbfae4eab45d312fc1df");
  };
}

export default MarvelService;