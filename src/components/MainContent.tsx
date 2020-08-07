import React from "react"
import tw from "twin.macro"

const Div = tw.div`
  bg-first
  min-h-screen
`

const Container = tw.div`
  lg:pr-12
  lg:pl-12
`

export const MainContent: React.FC = () => {
  return (
    <Div>
      <Container></Container>
    </Div>
  )
}
