import React, { useEffect } from 'react';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

export default function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("Hello")

  useEffect(() => {
    // console.log("window===>",window)
    window.electron.invoke('get-system-info').then(val=>console.log(val))
  }, []);

  return (
    <div style={styles.container}>
      {token ? (
        <div>
          <h2>Welcome</h2>
          <p>Device tracking in progress...</p>
          {/* Optionally show system info, location, etc */}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
};
