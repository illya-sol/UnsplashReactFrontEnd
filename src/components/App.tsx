import { observer } from "mobx-react"
import React, { useContext } from "react"
import tw from "twin.macro"
import { ModalStore } from "../store/MobxStore"
import { Register } from "./Forms/Register"
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

const App: React.FC = observer(() => {
  const isModal = useContext(ModalStore).isActive

  const ConditionalModal: React.FC = () => {
    if (isModal) return <Register />
    return null
  }

  return (
    <AppDiv>
      <Navbar />
      <ConditionalModal />
    </AppDiv>
  )
})

export default App
