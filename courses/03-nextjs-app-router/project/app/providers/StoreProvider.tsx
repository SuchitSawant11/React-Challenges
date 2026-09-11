'use client'

import { Provider, useDispatch, useSelector } from 'react-redux'
import type { ReactNode } from 'react'
import { store } from '../store/store'
import type { RootState, AppDispatch } from '../store/store'

interface StoreProviderProps {
  children: ReactNode
}

export default function StoreProvider({
  children,
}: StoreProviderProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

// useSelector and useDispatch are client-side Redux hooks.
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()