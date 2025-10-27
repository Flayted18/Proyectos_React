import './App.css';
import { useState } from 'react';
import { TwitterFollowCard } from './TwitterFollowCard';

export const App = () => {

  
  

  return (
    <div className='App' >
      <TwitterFollowCard 
        isFollowing
        userName='Flayted18'
        name='Santiago Faysal'
      />
      <TwitterFollowCard
        isFollowing
        userName='midudev'
        name='MiduDev'
      />
      <TwitterFollowCard
        isFollowing
        userName='Manuelp1345'
        name='Manuel Puente'
      />
    </div>
  )
}
