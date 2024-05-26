import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../../services/AuthService';
import SideBar from '../User/SideBar';
import UserEditModal from '../modal/UserEditModal';
import './UsersAdminPage.css';
import { User } from '../../interfaces/User';

const UsersAdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState<{ field: keyof User, dir: string }>({ field: 'name', dir: 'asc' });

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, sort]);

  const fetchUsers = (page: number, pageSize = 5) => {
    axios.get(`http://localhost:8080/api/users?page=${page}&size=${pageSize}&sort=${sort.field},${sort.dir}`, {
      headers: {
        Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
      }
    })
    .then(response => {
      if (response.data && Array.isArray(response.data.content)) {
        setUsers(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      }
    })
    .catch(error => console.error('Error fetching users:', error));
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSort = (field: keyof User) => {
    const dir = sort.field === field && sort.dir === 'asc' ? 'desc' : 'asc';
    setSort({ field, dir });
  };

  const handleDeleteByEmail = (email: string) => {
    axios.delete(`http://localhost:8080/api/users/by-email/${email}`, {
      headers: {
        Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
      }
    })
    .then(() => {
      fetchUsers(currentPage); 
    })
    .catch(error => console.error('Failed to delete user:', error));
  };

  const handleSave = (updatedUser: User) => {
    setIsModalOpen(false);
    const url = `http://localhost:8080/api/users/update`;
    axios.patch(url, updatedUser, {
      headers: {
        Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
      }
    })
    .then(response => {
      fetchUsers(currentPage); 
      console.log('User updated successfully:', response.data);
    })
    .catch(error => console.error('Failed to update user:', error));
  };

  return (
    <div className="user-table-content">
      <SideBar />
      <div className='table-content'>
        <table className='user-table'>
          <thead>
            <tr>
              <th onClick={() => handleSort('email')}>Електронна пошта</th>
              <th onClick={() => handleSort('name')}>Ім'я</th>
              <th onClick={() => handleSort('telegram')}>Telegram</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.telegram}</td>
                <td>
                  <button className='user-table-content-button' onClick={() => handleEdit(user)}>Редагувати</button>
                  <button className='user-table-content-button' onClick={() => handleDeleteByEmail(user.email)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button className="pagination-button" key={i} onClick={() => setCurrentPage(i)}>{i + 1}</button>
          ))}
        </div>
      </div>
      {selectedUser && (
        <UserEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UsersAdminPage;
