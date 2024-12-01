import {configureStore} from  '@reduxjs/toolkit';
import boardSlice from './boardSlice';
import saveBoardSlice from './savedataSlice';
import { data } from 'autoprefixer';
import modalDeleteSlice from './modalSlice'
import themeSlice from './themeSlice';

const store=configureStore({
    reducer:{
        board: boardSlice, 
        boardsave:saveBoardSlice,
        modals:modalDeleteSlice,
        theme:themeSlice,
    },
})

export default store;