import {configureStore} from  '@reduxjs/toolkit';
import boardSlice from './boardSlice';
import saveBoardSlice from './savedataSlice';
import { data } from 'autoprefixer';

const store=configureStore({
    reducer:{
        board: boardSlice, 
        boardsave:saveBoardSlice,
    },
})

export default store;