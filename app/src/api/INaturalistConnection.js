
const BASE_URL = 'https://api.inaturalist.org/v1/';

const getData = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
    } catch (error) {
        console.log('Network error: ', error);
        throw error;
    }
}

export default {
    getData,
};