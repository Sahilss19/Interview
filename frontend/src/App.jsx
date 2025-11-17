import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <>
      <h1>APPLICATION M APKA SWAGAT HAI 😁</h1>

      {/* Only show SignIn button when user is signed out */}

      <SignedOut>
        <SignInButton mode='modal' >
          <button>Sign In/Sign up</button>
        </SignInButton>
      </SignedOut>


      <SignedIn>
        <SignOutButton />
      </SignedIn>


      {/* User profile button */}
      
      <UserButton />
    </>
  )
}

export default App
