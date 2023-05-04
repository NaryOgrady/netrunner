import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useReducer } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const initialStat = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'name':
        return { name: action.payload }
        break;
      case 'lastName':
        return { lastName: action.payload }
        break;
      case 'email':
        state.email = action.payload
        return state
        break;
      case 'password':
        state.email = action.payload
        return state
        break;
    
      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialStat)

  return (
    <form>
      <div>
        <input 
          type="text"
          value={state.name}
          onChange={e => dispatch({ type: 'name', payload: e.target.value})} 
        />
      </div>
      <div>
        <input
          type="text"
          value={state.lastName}
          onChange={e => dispatch({ type: 'lastName', payload: e.target.value })}
        />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
    </form>
  )
}