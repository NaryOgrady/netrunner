import { createSlice } from "@reduxjs/toolkit"

interface User {
  uid: string
}

interface IUserState {
  user: null | User
}

const initialState: IUserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer