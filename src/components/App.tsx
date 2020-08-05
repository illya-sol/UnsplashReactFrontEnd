import React from "react"
import tw from "twin.macro"
import { Navbar } from "./Navbar"

const AppDiv = tw.div`
  max-h-screen
  text-center
`
const AppHeader = tw.header`
  bg-first
  min-h-screen
  flex
  flex-col
  items-center
  justify-center
  text-2xl
`

const P = tw.p`
  text-purple-500
`

const App: React.FC = () => {
  return (
    <AppDiv>
      <Navbar />
      <AppHeader>
        <P>React App Rewired</P>
      </AppHeader>
    </AppDiv>
  )
}

export default App
