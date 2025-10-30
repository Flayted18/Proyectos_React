import { useEffect, useState } from "react"

function FollowMouse() {
  
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  useEffect(() => {
    console.log('effect', {enabled})

    const handleMove = (event) => {
      const {clientX, clientY} = event
      console.log('handleMove', {clientX, clientY})
      setPosition({x: clientX, y: clientY})
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // Cleanup function. 
    // When the component unmounts 
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }

  }, [enabled])

  return(
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
        
      }}/>
      <button onClick={()=>setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} Seguir Puntero
      </button>
    </main>
  )
}

function App() {
  const [mounted, setMounted] = useState(true)

  return (
    <main>
      {mounted && <FollowMouse />}

      <button onClick={() => setMounted(!mounted)}>
        toggle FollowMouse component
      </button>
      
    </main>
  )
}

export default App
