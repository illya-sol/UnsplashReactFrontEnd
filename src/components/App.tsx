import { observer } from "mobx-react"
import React, { useContext } from "react"
import tw from "twin.macro"
import { ModalStore } from "../store/MobxStore"
import { Register } from "./Forms/Register"
import { MainContent } from "./MainContent"
import { Navbar } from "./Navbar"

const AppDiv = tw.div`
  max-h-screen
  text-center
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
      <MainContent />
    </AppDiv>
  )
})

export default App
