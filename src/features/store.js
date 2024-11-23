import {configureStore} from  '@reduxjs/toolkit';
import boardSlice from './boardSlice';
import saveDataSlice from './savedataSlice';
import { data } from 'autoprefixer';

const store=configureStore({
    reducer:{
        board: boardSlice,
        data:saveDataSlice,
    },
})

export default store;