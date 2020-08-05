import React from "react"
import tw from "twin.macro"
import { ReactComponent as Home } from "../resources/home.svg"

const Div = tw.div`
  flex
  bg-second
`

const HomeSvg = tw(Home)`
  mx-4 
  my-2 
  hover:fill-current 
  hover:text-third
`

export const Navbar: React.FC = () => {
  return (
    <Div>
      <HomeSvg />
    </Div>
  )
}
