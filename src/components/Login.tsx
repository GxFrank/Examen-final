import { useState } from 'react';
import { getUserByUsername } from '../controller/userController';
import { User } from '../types/User';

const Login = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = getUserByUsername(username);
    if (user && user.password === password) {
      onLogin(user);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;