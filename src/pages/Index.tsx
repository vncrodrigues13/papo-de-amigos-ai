
import React, { useState } from 'react';
import ConfigurationScreen from '@/components/ConfigurationScreen';
import QuestionDisplay from '@/components/QuestionDisplay';

const Index = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [interests, setInterests] = useState('');
  const [context, setContext] = useState('');

  const handleStart = (userInterests: string, userContext: string) => {
    setInterests(userInterests);
    setContext(userContext);
    setIsConfigured(true);
  };

  const handleReconfigure = () => {
    setIsConfigured(false);
  };

  if (isConfigured) {
    return (
      <QuestionDisplay
        interests={interests}
        context={context}
        onReconfigure={handleReconfigure}
      />
    );
  }

  return <ConfigurationScreen onStart={handleStart} />;
};

export default Index;
