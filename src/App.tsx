import React from 'react';
import { Button } from '@material-ui/core';
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>{process.env.REACT}</code> and save to reload.
        </p>
        <Button>Hello</Button>
      </header>
    </div>
  );
};

export default App;
