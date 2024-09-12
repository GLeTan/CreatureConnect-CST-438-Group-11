//import {searchSite} from '../../app/src/api/inaturalistApi';
import {fetchWikipediaInfo} from '../../app/src/api/wikipediaApi';

describe('fetchSpecies', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('fetches species data correctly', async () => {
//        fetch.mockResponseOnce(JSON.stringify({
//            results: [
//                {id: 4338},
//            ],
//        }));

        //const results = await searchSite('shoebill');
        const results = await fetchWikipediaInfo('shoebill');
        console.log("results: ", results);
        expect(results).toEqual([
            {title: 'Shoebill'},
        ]);

    });

});