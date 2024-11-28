import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { deleteUser } from '../../store/slices/userSlice';
import AddUserForm from './AddUserForm';

export default function UserList() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Danh sách người dùng</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowAddForm(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          Thêm mới
        </button>
      </div>

      {showAddForm && (
        <AddUserForm
          editUser={editingUser}
          onClose={() => {
            setShowAddForm(false);
            setEditingUser(null);
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tên</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tuổi</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{user.id}</td>
                  <td className="px-6 py-4 text-sm">{user.name}</td>
                  <td className="px-6 py-4 text-sm">{user.old}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              Chưa có người dùng nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
}