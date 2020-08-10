import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import tw from 'twin.macro'
import { ModalStore } from '../store/MobxStore'
import { Register } from './Forms/Register'
import { MainContent } from './MainContent'
import { Navbar } from './Navbar'

const AppDiv = tw.div`
  max-h-screen
  text-center
`

const RootDiv = tw.div`

`

const App: React.FC = observer(() => {
  const store = useContext(ModalStore)

  const ConditionalModal: React.FC = observer(() => {
    if (store.isActive) return <Register />
    return null
  })

  return (
    <AppDiv>
      <ConditionalModal />
      <RootDiv>
        <Navbar />
        <MainContent />
      </RootDiv>
    </AppDiv>
  )
})

export default App
