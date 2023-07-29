// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './screen/Home';
import AddNew from './screen/AddNew';
import TabBar from './TabBar';

function App() {
  return (
    <Router>
      <div className="App">
        <TabBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/them-moi" element={<AddNew />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
