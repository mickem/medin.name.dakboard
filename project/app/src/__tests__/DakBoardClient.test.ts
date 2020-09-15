import axios from 'axios';
import DakBoardClient from '../helpers/DakBoardClient';
jest.mock('axios');

describe('DakBoardClient', () => {
    const dc = new DakBoardClient('api-key');;
    const aGet = (axios.get as jest.Mock);
    const aPut = (axios.put as jest.Mock);
    beforeEach(() => {
        aGet.mockReset();
        aPut.mockReset();
    })
    test('can fetch screens', async () => {
        aGet.mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'the-id' }] }));
        expect(await dc.getScreens()).toStrictEqual([{ id: 'the-id' }]);
        expect(aGet).toBeCalledWith('https://dakboard.com/api/2/screens?api_key=api-key');
    });
    test('can fetch blocks', async () => {
        aGet.mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'the-id' }] }));
        expect(await dc.getBlocks('screen')).toStrictEqual([{ id: 'the-id' }]);
        expect(aGet).toBeCalledWith('https://dakboard.com/api/2/screens/screen/blocks?api_key=api-key');
    });
    test('get 404 should retry', async () => {
        aGet
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'another-id' }] }));
        expect(await dc.getBlocks('screen')).toStrictEqual([{ id: 'another-id' }]);
        expect(aGet).toBeCalledWith('https://dakboard.com/api/2/screens/screen/blocks?api_key=api-key');
    });
    test('get 404 should retry max 5 times', async () => {
        aGet
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'never' }] }));
        await expect(dc.getBlocks('screen')).rejects.toEqual(new Error('Failed to fetch block (/screens/screen/blocks): 404'));
    });
    test('get 500 should retry not retry', async () => {
        aGet.mockImplementationOnce(() => Promise.reject({ response: { status: 500 } }))
            .mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'never' }] }));
        await expect(dc.getBlocks('screen')).rejects.toEqual(new Error('Failed to fetch block (/screens/screen/blocks): 500'));
    });
    test('can refresh screens', async () => {
        aPut.mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'the-id' }] }));
        expect(await dc.refresh('screen')).toStrictEqual([{ id: 'the-id' }]);
        expect(aPut).toBeCalledWith('https://dakboard.com/api/2/screens/screen?api_key=api-key', 'refresh=1', { "headers": { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }});
    });
    test('can disable block', async () => {
        aPut.mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'the-id' }] }));
        expect(await dc.disableBlock('screen', 'block', 1)).toStrictEqual([{ id: 'the-id' }]);
        expect(aPut).toBeCalledWith('https://dakboard.com/api/2/screens/screen/blocks/block?api_key=api-key', 'is_disabled=1', { "headers": { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }});
    });
    test('can set text', async () => {
        aPut.mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'the-id' }] }));
        expect(await dc.setText('screen', 'block', 'Hello World')).toStrictEqual([{ id: 'the-id' }]);
        expect(aPut).toBeCalledWith('https://dakboard.com/api/2/screens/screen/blocks/block?api_key=api-key', 'text=Hello%20World&is_disabled=0', { "headers": { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }});
    });
    test('put 404 should retry', async () => {
        aPut
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'another-id' }] }));
        expect(await dc.refresh('screen')).toStrictEqual([{ id: 'another-id' }]);
        expect(aPut).toBeCalledWith('https://dakboard.com/api/2/screens/screen?api_key=api-key', 'refresh=1', { "headers": { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }});
    });
    test('put 404 should retry max 5 times', async () => {
        aPut
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))
            .mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'another-id' }] }));
        await expect(dc.refresh('screen')).rejects.toEqual(new Error('Failed to update block (https://dakboard.com/api/2/screens/screen?api_key=api-key): 404'));
    });
    test('put 500 should retry not retry', async () => {
        aPut.mockImplementationOnce(() => Promise.reject({ response: { status: 500 } }))
            .mockImplementationOnce(() => Promise.resolve({ data: [{ id: 'never' }] }));
        await expect(dc.refresh('screen')).rejects.toEqual(new Error('Failed to update block (https://dakboard.com/api/2/screens/screen?api_key=api-key): 500'));
    });
});