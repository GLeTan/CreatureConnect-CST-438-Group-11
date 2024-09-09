const BASE_URL = 'https://api.inaturalist.org/v1';

export const searchSite = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search?q=${query}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching search info from INaturalist:', error);
        throw error;
      }
}