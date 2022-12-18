import { SignIn, SignUp, Modal } from '@/components'
import * as React from 'react'

type SignInModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  showSignInFirst: boolean
}

export const SignInModal = ({ open, onOpenChange, showSignInFirst = true }: SignInModalProps) => {
  const [showSignIn, setShowSignIn] = React.useState<boolean>(showSignInFirst)
  const switchForm = (state: boolean) => setShowSignIn(state)
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {showSignIn ? (
        <SignIn onSwitchFormClick={switchForm} />
      ) : (
        <SignUp onSwitchFormClick={switchForm} />
      )}
    </Modal>
  )
}
