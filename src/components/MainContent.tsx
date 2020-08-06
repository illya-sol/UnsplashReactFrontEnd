import React, { useEffect } from "react"
import tw from "twin.macro"

const Div = tw.div`
   lg:pr-6
   lg:pl-6
`

const Container = tw.div`
   
`

export const Navbar: React.FC = () => {
  useEffect(() => {})

  return (
    <Div>
      <Container></Container>
    </Div>
  )
}
