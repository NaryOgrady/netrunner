import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

import { Card, CardContent, Button, Typography, TextField, IconButton, InputAdornment, Alert } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const router = useRouter()

  useEffect(() => {
    setLoginError('')
  }, [email, password, confirmPassword, mode])

  function handleSingUp() {
    if (mode === 'login') {
      setMode('signup')
      return
    }
    setMode('login')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const auth = getAuth()
    let resp
    if (mode === 'signup') {
      try {
        resp = await createUserWithEmailAndPassword(auth, email, password)
      } catch (e: any) {
        setLoginError(e.message)
        return
      }
      router.push('/collection')
      return
    }
    try {
      resp = await signInWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      setLoginError(e.message)
      return
    }
    router.push('/collection')
  }

  const isDisable = !email || !password || (mode === 'signup' && !confirmPassword)

  return (
    <div className="h-screen flex justify-center items-center">
      <Card sx={{ width: 300, mx: '5px'}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            { mode === 'login' ? 'Login' : 'Sign Up' }
          </Typography>
          <form 
            className="flex flex-col items-center w-full mb-2"
            onSubmit={handleSubmit}
          >
            {loginError &&
              <Alert severity="error" className="mb-4">
                { loginError }
              </Alert>
            }
            <TextField
              value={email}
              label="Email"
              variant="standard"
              fullWidth
              className="mb-6"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              value={password}
              label="Password"
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              className="mb-6"
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff />: <Visibility />}
                  </IconButton>
                </InputAdornment>,
              }}
            />
            {mode !== 'login' && 
              <TextField
                value={confirmPassword}
                label="confirm password"
                variant='standard'
                fullWidth
                type={showPassword ? 'text' : 'password'}
                className="mb-6"
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff />: <Visibility />}
                    </IconButton>
                  </InputAdornment>,
                }}
              />
            }
            <Button disabled={isDisable} type="submit" variant="outlined">Submit</Button>
          </form>
          {mode === 'login' ? (
            <div>
              <span>new to netrunner?</span>
              <Button onClick={handleSingUp}>
                Sign up
              </Button>
            </div>
          ): (
            <div>
              <span>Already have an account?</span>
              <Button onClick={handleSingUp}>
                Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}