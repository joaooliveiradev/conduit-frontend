import SignUp from '@components/Form/SignInModal/SignUp'
import SignIn from '@components/Form/SignInModal/SignIn'
import { useState } from 'react'
import { Modal } from '@components/Modal'

type SignInModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SignInModal = ({ open, onOpenChange }: SignInModalProps) => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true)
  const switchForm = (state: boolean) => setShowSignIn(state)
  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      {showSignIn ? (
        <SignIn handleClick={switchForm} />
      ) : (
        <SignUp handleClick={switchForm} />
      )}
    </Modal>
  )
}

export default SignInModal
