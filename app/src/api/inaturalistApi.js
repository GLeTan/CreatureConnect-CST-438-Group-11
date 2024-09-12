const BASE_URL = 'https://api.inaturalist.org/v1';

export const searchSite = async (query) => {
    try {

        const searchQuery = 'Lion';
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*`;

        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Url: ', url);
        //const response = await fetch(`${BASE_URL}/observations?q=${encodeURIComponent(query)}`);

        if(!response.ok){
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        console.log('Raw Response:');
        console.log(text);
        if(!text){
            throw new Error(`Received an empty response from the server. ${response.status} ${response.statusText}`);
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch (error) {
          throw new Error('Invalid JSON response: ' + error.message);
        }
        return data.results;

      } catch (error) {
        console.error('Error fetching search info from INaturalist:', error);
        throw error;
      }

//    const searchQuery = 'Lion';
//    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*`;
//
//    try{
//        fetch(url)
//              .then(response => response.json())
//              .then(data => {
//                console.log(data.query.search[0]); // First search result
//              })
//
//    } catch (error) {
//        console.error('Error fetching search info from INaturalist:', error);
//    }
}