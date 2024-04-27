import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '../api/api';

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

export const editItem = createAsyncThunk(
  'items/edit',
  async (item: Item) => {
    return item;
  }
);

export const deleteItem = createAsyncThunk(
  'items/delete',
  async (id: number) => {
    return id;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Item, 'userId' | 'id'>>) => {
      const newItem = {
        ...action.payload,
        id: Date.now(),
        userId: 1,
      };
      state.items.push(newItem);
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editItem.fulfilled, (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if(index !== -1) state.items[index] = action.payload;
    });

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  },
});

export const { addItem, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
