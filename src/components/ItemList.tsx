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
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
