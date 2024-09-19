import {fetchWikipediaInfo, fetchRelevantPages} from '../../app/src/api/wikipediaApi';

describe('fetchWikipediaInfo', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('fetches Wikipedia info correctly', async () => {
        fetch.mockResponseOnce(JSON.stringify({
            query: {
                search: [
                    {title: 'Shoebill'}
                ]
            }
        }));

        fetch.mockResponseOnce(JSON.stringify({
            title: 'Shoebill',
            extract: 'The shoebill (Balaeniceps rex) is a large stork-like bird...',
        }));

        const results = await fetchWikipediaInfo('shoebill');

        console.log("results: ", results);

        expect(results).toEqual({
            title: 'Shoebill',
            summary: 'The shoebill (Balaeniceps rex) is a large stork-like bird...',
            thumbnail: null
        });
    });
});

describe('fetchRelevantPages', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('fetches relevant pages correctly', async () => {
        // Mock response for Wikipedia search
        fetch.mockResponseOnce(JSON.stringify({
          query: {
            search: [
              { title: 'Shoebill' },
              { title: 'Bald Eagle' },
            ]
          }
        }));

        // Mock response for first Wikipedia summary (Shoebill)
        fetch.mockResponseOnce(JSON.stringify({
          title: 'Shoebill',
          thumbnail: { source: 'https://example.com/shoebill.jpg' }
        }));

        // Mock response for second Wikipedia summary (Bald Eagle)
        fetch.mockResponseOnce(JSON.stringify({
          title: 'Bald Eagle',
          thumbnail: { source: 'https://example.com/bald_eagle.jpg' }
        }));

        const results = await fetchRelevantPages('bird');

        console.log("results: ", results);

        expect(results).toEqual({
          results: [
            { title: 'Shoebill', thumbnail: 'https://example.com/shoebill.jpg' },
            { title: 'Bald Eagle', thumbnail: 'https://example.com/bald_eagle.jpg' }
          ]
        });
      });

});