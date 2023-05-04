import { useEffect, useState } from "react"
import { User } from "firebase/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"

import { useAppDispatch, useAppSelector } from "@/store"
import userSlice, { setUser } from "@/store/userSlice"

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        router.replace('login')
        return
      }
      user = JSON.parse(JSON.stringify(user))
      dispatch(setUser(user))
      setLoading(false)
    })
    return unsubscribe
  }, [dispatch, router])

  return <>{ user ? children : null }</>
}