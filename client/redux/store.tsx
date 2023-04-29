import { createStore, combineReducers} from 'redux';
import CountReducer from './reducers/quickLogReducer';

const rootReducer = combineReducers({
    count: CountReducer,
});

export const store = createStore(rootReducer);