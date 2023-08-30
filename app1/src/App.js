import React, { Suspense } from 'react';
import './App.css';
const RemoteApp = React.lazy(() => import('app2/App'));

const App = () => {
  return (
    <div>
      <div className="banner">
        <h1>App1</h1>
      </div>
      <Suspense fallback={'loading...'}>
        <RemoteApp />
      </Suspense>
    </div>
  );
};

export default App;
