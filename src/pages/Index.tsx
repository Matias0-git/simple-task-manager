
import React from 'react';
import Header from '../components/Header';
import TaskList from '../components/TaskList';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-apple-gray">
      <Header />
      <main className="pt-6">
        <TaskList />
      </main>
    </div>
  );
};

export default Index;
