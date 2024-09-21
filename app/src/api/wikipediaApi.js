// Takes in a search term, and
// returns a data object with the following properties:
// title, summary, thumbnail
export const fetchWikipediaInfo = async (searchTerm) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;

    const response = await fetch(url);
    const data = await response.json();

    // Check if there are results
    if (data.query.search.length === 0) {
      throw new Error('No results found');
    }

    // Get the title of the first search result
    const pageTitle = data.query.search[0].title;

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;

    const summaryResponse = await fetch(summaryUrl);
    const summaryData = await summaryResponse.json();

    console.log("Title:", summaryData.title);
    console.log("Summary:", summaryData.extract);

    return {
      title: summaryData.title,
      summary: summaryData.extract,
      thumbnail: summaryData.thumbnail?.source || null,  // Optional: Get thumbnail image if available
    };
  } catch (error) {
    console.error('Error fetching Wikipedia info:', error);
    return null;
  }
};

// Takes in a search term, and returns a list of:
// page titles and thumbnails
export const fetchRelevantPages = async (searchTerm) => {
    try{
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error fetching Wikipedia search results');
        }

        const searchData = await response.json();
        const pages = searchData.query.search;

        const results = await Promise.all(
              pages.map(async (page: any) => {
                const title = page.title;
                const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

                const summaryResponse = await fetch(summaryUrl);
                const summaryData = await summaryResponse.json();

                return {
                  title,
                  thumbnail: summaryData.thumbnail?.source || null, // Get thumbnail if available
                };
              })
            );

            return { results };

    } catch (error) {
        console.error('Error fetching relevant pages:', error);
        return null;
    }
};

export const fetchThumbnailByAnimalName = async (pageName) => {
    try{
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
        const summaryResponse = await fetch(summaryUrl);
        const summaryData = await summaryResponse.json();

        return{
            thumbnail: summaryData.thumbnail?.source || null,
        }
    } catch (error) {
       console.error('Error fetching thumbnail from Wikipedia page:', error);
       return null;
    }
};
