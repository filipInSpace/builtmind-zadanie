import { useEffect, useState } from 'react';
import { fetchItems, Item } from '../api/api';

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    };

    getItems();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4 p-4">
      {items.map((item) => (
        <div key={item.id} className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <div className="sm:flex sm:items-center px-6 py-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-4 mb-2">{item.title}</h2>
            <p className="text-sm text-gray-700 sm:text-md mt-2">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;