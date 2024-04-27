import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/itemsSlice';

const AddItemForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(addItem({ title, body }));

    setTitle('');
    setBody('');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 space-y-4 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto px-6 py-4 space-y-2">
        <h1 className="text-2xl font-bold mb-4">Add Item</h1>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400">Add</button>
      </form>
    </div>
  );
};

export default AddItemForm;
