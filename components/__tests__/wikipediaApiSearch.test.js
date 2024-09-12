//import {searchSite} from '../../app/src/api/inaturalistApi';
import {fetchWikipediaInfo} from '../../app/src/api/wikipediaApi';

jest.mock('node-fetch', () => require('jest-fetch-mock'));
import fetch from 'jest-fetch-mock';

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