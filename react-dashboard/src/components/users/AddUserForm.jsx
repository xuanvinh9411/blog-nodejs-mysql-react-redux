import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../../store/slices/userSlice';
import { X } from 'lucide-react';

export default function AddUserForm({ editUser, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    old: ''
  });
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name,
        old: editUser.old
      });
    }
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      dispatch(updateUser({
        id: editUser.id,
        ...formData
      }));
    } else {
      dispatch(addUser({
        id: Date.now(),
        ...formData
      }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">
          {editUser ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tuổi</label>
            <input
              type="number"
              value={formData.old}
              onChange={(e) => setFormData(prev => ({...prev, old: e.target.value}))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tuổi"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              {editUser ? 'Cập nhật' : 'Thêm mới'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}