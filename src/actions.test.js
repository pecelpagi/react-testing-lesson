import * as actions from './actions';
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

export const mockStore = configureStore([thunkMiddleware]);

describe('actions test', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should create an action to search robots', () => {
        const text = 'wooo';
        const expectedAction = {
            type: CHANGE_SEARCHFIELD,
            payload: text
        };

        expect(actions.setSearchField(text)).toEqual(expectedAction);
    });

    it('successfully requested robots API', (done) => {
        expect.assertions(1);

        fetch.mockResponseOnce(JSON.stringify([]));

        const expectedActions = [
            { type: REQUEST_ROBOTS_PENDING },
            {
                type: REQUEST_ROBOTS_SUCCESS,
                payload: []
            }
        ];

        const store = mockStore();
        store.dispatch(actions.requestRobots()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        })
    });

    it('failed requesting robots API', (done) => {
        expect.assertions(1);

        fetch.mockRejectOnce(() => (Promise.reject('failed')));

        const expectedActions = [
            { type: REQUEST_ROBOTS_PENDING },
            {
                type: REQUEST_ROBOTS_FAILED,
                payload: 'failed'
            }
        ];

        const store = mockStore();
        store.dispatch(actions.requestRobots()).then((res) => Promise.reject()).catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });
})