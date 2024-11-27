import {configureStore} from  '@reduxjs/toolkit';
import boardSlice from './boardSlice';
import saveBoardSlice from './savedataSlice';
import { data } from 'autoprefixer';
import modalDeleteSlice from './modalSlice'

const store=configureStore({
    reducer:{
        board: boardSlice, 
        boardsave:saveBoardSlice,
        modals:modalDeleteSlice,
    },
})

export default store;