import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchItems, Item } from '../api/api';
import { setItems, editItem, deleteItem } from '../redux/itemsSlice';

const ItemList = () => {
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    const getItems = async () => {
      const fetchedItems = await fetchItems();
      dispatch(setItems(fetchedItems));
    };

    getItems();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4 p-4">
      {items.map((item) => (
        <div key={item.id} className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <div className="sm:flex sm:items-center px-6 py-4 space-y-4">
            {editingItem?.id === item.id ? (
              <form className="space-y-2" onSubmit={(e) => {
                e.preventDefault();
                dispatch(editItem(editingItem));
                setEditingItem(null);
              }}>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                />
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={editingItem.body}
                  onChange={(e) => setEditingItem({ ...editingItem, body: e.target.value })}
                />
                <div className="flex flex-col items-center">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400" type="submit">Submit</button>
                </div>
              </form>
            ) : (
              <>
              <div className="flex items-center justify-center space-x-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-4 mb-2">{item.title}</h2>
                <p className="text-sm text-gray-700 sm:text-md mt-2">{item.body}</p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400" onClick={() => setEditingItem(item)}>Edit</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400" onClick={() => dispatch(deleteItem(item.id))}>Delete</button>
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;