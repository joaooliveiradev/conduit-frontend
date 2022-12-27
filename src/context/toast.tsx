import * as React from 'react'

type ToastDefaultValueProps = {
  isToastOpen: boolean
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type ToastProviderProps = {
  children: React.ReactNode
}

const toastDefaultValue: ToastDefaultValueProps = {
  isToastOpen: false,
  setIsToastOpen: () => null,
}

const ToastContext = React.createContext(toastDefaultValue)

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [isToastOpen, setIsToastOpen] = React.useState<boolean>(false)
  return (
    <ToastContext.Provider value={{ isToastOpen, setIsToastOpen }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  return context
}
