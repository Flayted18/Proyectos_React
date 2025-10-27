import './App.css';
import { useState } from 'react';
import { TwitterFollowCard } from './TwitterFollowCard';



const users = [
  {
    userName: 'Flayted18',
    name: 'Santiago Faysal',
    isFollowing: true
  },
  {
    userName: 'midudev',
    name: 'MiduDev',
    isFollowing: false
  },
  {
    userName: 'Manuelp1345',
    name: 'Manuel Puente',
    isFollowing: true
  },
  {    
    userName: 'evanYou',
    name: 'Evan You',
    isFollowing: false
  }
]

export const App = () => {
  return (
    <section className='App' >

      {
        users.map(({userName, name, isFollowing}) =>{
          return (
            <TwitterFollowCard 
              key={userName}
              userName={userName}
              name={name}
              initialIsFollowing={isFollowing}
            />)
        })
      }

    </section>
  )
}
