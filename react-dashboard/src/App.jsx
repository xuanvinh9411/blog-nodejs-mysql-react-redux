import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import UserList from './components/users/UserList';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Trang chủ</div>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<div>Trang Sản phẩm</div>} />
          <Route path="/settings" element={<div>Trang Cài đặt</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;