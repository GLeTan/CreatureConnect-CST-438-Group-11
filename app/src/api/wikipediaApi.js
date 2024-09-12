export const fetchWikipediaInfo = async (searchTerm) => {
  try {
    // Wikipedia API URL to search for the term
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;

    // Make the API call to search for the term
    const response = await fetch(url);
    const data = await response.json();

    // Check if there are results
    if (data.query.search.length === 0) {
      throw new Error('No results found');
    }

    // Get the title of the first search result
    const pageTitle = data.query.search[0].title;

    // Fetch the summary of the page
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;

    const summaryResponse = await fetch(summaryUrl);
    const summaryData = await summaryResponse.json();

    // Log the title and summary to the console
    console.log("Title:", summaryData.title);
    console.log("Summary:", summaryData.extract);

    // Return the page title and summary
    return {
      title: summaryData.title,  // Add the missing comma here
      summary: summaryData.extract,
      thumbnail: summaryData.thumbnail?.source || null,  // Optional: Get thumbnail image if available
    };
  } catch (error) {
    console.error('Error fetching Wikipedia info:', error);
    return null;
  }
};
