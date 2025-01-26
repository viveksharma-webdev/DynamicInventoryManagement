import { useState } from "react";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: 0 });
  const [filterCategory, setFilterCategory] = useState("");
  const [sortByQuantity, setSortByQuantity] = useState(false);

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity >= 0) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ name: "", category: "", quantity: 0 });
    }
  };

  const handleEditItem = (id) => {
    const updatedName = prompt("Edit Name", items.find(item => item.id === id).name);
    const updatedCategory = prompt("Edit Category", items.find(item => item.id === id).category);
    const updatedQuantity = prompt("Edit Quantity", items.find(item => item.id === id).quantity);

    if (updatedName !== null && updatedCategory !== null && updatedQuantity !== null) {
      setItems(
        items.map(item =>
          item.id === id
            ? {
                ...item,
                name: updatedName,
                category: updatedCategory,
                quantity: parseInt(updatedQuantity, 10)
              }
            : item
        )
      );
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = filterCategory
    ? items.filter(item => item.category === filterCategory)
    : items;

  const sortedItems = sortByQuantity
    ? [...filteredItems].sort((a, b) => a.quantity - b.quantity)
    : filteredItems;

  return (
    <div style={{fontFamily: "Arial, sans-serif" } } className="px-[3vh] py-4">
      <h1 className="text-5xl font-bold mb-5"> Dynamic Inventory Management</h1>

      <div className="mb-[20px] flex gap-[10px] text-white">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={{flex: 1 }}
          className="flex-1 p-[20px] border-[1px] border-gray-500 bg-gray-500 rounded-sm" 
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="flex-1 p-[20px] border-[1px] border-gray-500 bg-gray-500 rounded-sm" 
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          className="flex-1 p-[20px] border-[1px] border-gray-500 bg-gray-500 rounded-sm" 
        />
        <button onClick={handleAddItem} className="px-[10px] py-[7px] bg-green-500 rounded-md text-white font-semibold">Add Item</button>
      </div>

      <div className="mb-5 flex justify-between">
        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-6 py-6 w-[18vw] text-xl font-semibold border-[1px] border-black rounded-sm"
        >
          <option value="">All Categories</option>
          {[...new Set(items.map(item => item.category))].map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={() => setSortByQuantity(!sortByQuantity)} className="px-7 py-[1px] bg-green-500 rounded-md text-white font-semibold text-md rounded-full">
          Sort by Quantity
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-1 border-black p-5">Name</th>
            <th className="border-1 border-black p-5">Category</th>
            <th className="border-1 border-black p-5">Quantity</th>
            <th className="border-1 border-black p-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(item => (
            <tr
              key={item.id}
              style={{ backgroundColor: item.quantity < 10 ? "#f8d7da" : "transparent" }}
            >
              <td className="text-center border-1 border-[#ddd] p-[20px]">{item.name}</td>
              <td className="text-center border-1 border-[#ddd] p-[20px] ">{item.category}</td>
              <td className="text-center border-1 border-[#ddd] p-[20px]">{item.quantity}</td>
              <td className="text-center border-1 border-[#ddd] p-[20px]">
                <button
                  onClick={() => handleEditItem(item.id)}
                  style={{ marginRight: "10px", padding: "5px 10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  style={{ padding: "5px 10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;