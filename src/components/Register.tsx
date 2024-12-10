import { useState } from 'react';
import { saveUser } from '../controller/userController';
import { User } from '../types/User';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegister = () => {
    const newUser: User = { id: Date.now().toString(), username, password, fullName, activities: [] };
    saveUser(newUser);
    alert('User registered successfully');
  };

  return (
    <div>
      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;