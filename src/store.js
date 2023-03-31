import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({reducer: {analysis: reducer}});

export default store;
