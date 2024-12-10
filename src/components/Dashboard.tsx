import { useState, useEffect } from 'react';
import { User, Activity } from '../types/User';
import { saveUser } from '../controller/userController';

const Dashboard = ({ user, onLogout }: { user: User, onLogout: () => void }) => {
  const [activities, setActivities] = useState<Activity[]>(user.activities || []);
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityDescription, setNewActivityDescription] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const updatedUser = { ...user, activities };
    saveUser(updatedUser);
  }, [activities, user]);

  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      name: newActivityName,
      description: newActivityDescription,
    };
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    setNewActivityName('');
    setNewActivityDescription('');
  };

  const editActivity = (id: string, name: string, description: string) => {
    const updatedActivities = activities.map(activity =>
      activity.id === id ? { ...activity, name, description } : activity
    );
    setActivities(updatedActivities);
  };

  const deleteActivity = (id: string) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    setActivities(updatedActivities);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progress = (activities.length / 10) * 100;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <span>Welcome, {user.fullName}</span>
        <button onClick={onLogout}>Logout</button>
      </nav>
      <h1>Home</h1>
      <div className="weather">Current Weather: {/* Add weather component here */}</div>
      <input
        type="text"
        value={newActivityName}
        onChange={(e) => setNewActivityName(e.target.value)}
        placeholder="Activity Name"
        className="input"
      />
      <input
        type="text"
        value={newActivityDescription}
        onChange={(e) => setNewActivityDescription(e.target.value)}
        placeholder="Activity Description"
        className="input"
      />
      <button onClick={addActivity} className="button">Add Activity</button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Activities"
        className="input"
      />
      <table className="activity-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.name}</td>
              <td>{activity.description}</td>
              <td>
                <button onClick={() => editActivity(activity.id, prompt('New name:', activity.name) || activity.name, prompt('New description:', activity.description) || activity.description)}>Edit</button>
                <button onClick={() => deleteActivity(activity.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={toggleHistory} className="button">View Activity History</button>
      {showHistory && (
        <div className="history">
          <h2>Activity History</h2>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>{activity.name}: {activity.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;