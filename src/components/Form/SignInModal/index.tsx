import { SignIn, SignUp, Modal } from '@/components'
import { useState } from 'react'

type SignInModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SignInModal = ({ open, onOpenChange }: SignInModalProps) => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true)
  const switchForm = (state: boolean) => setShowSignIn(state)
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      {showSignIn ? (
        <SignIn onSwitchFormClick={switchForm} />
      ) : (
        <SignUp onSwitchFormClick={switchForm} />
      )}
    </Modal>
  )
}
