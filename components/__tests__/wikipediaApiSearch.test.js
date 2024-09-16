import {fetchWikipediaInfo} from '../../app/src/api/wikipediaApi';

describe('fetchSpecies', () => {
    beforeEach(() => {
        fetch.resetMocks();  // Reset mock fetch before each test
    });

    it('fetches species data correctly', async () => {
        // Mock the API response for Wikipedia search
        fetch.mockResponseOnce(JSON.stringify({
            query: {
                search: [
                    {title: 'Shoebill'}
                ]
            }
        }));

        // Mock the API response for the Wikipedia summary
        fetch.mockResponseOnce(JSON.stringify({
            title: 'Shoebill',
            extract: 'The shoebill (Balaeniceps rex) is a large stork-like bird...',
        }));

        // Call the actual function
        const results = await fetchWikipediaInfo('shoebill');

        console.log("results: ", results);  // Log the results for debugging

        // Assert that the results match what we expect
        expect(results).toEqual({
            title: 'Shoebill',
            summary: 'The shoebill (Balaeniceps rex) is a large stork-like bird...',
            thumbnail: null  // Optional: Add if mocking the thumbnail
        });

    });

});
