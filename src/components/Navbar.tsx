import React from "react"
import tw from "twin.macro"
import { ReactComponent as Home } from "../resources/home.svg"
import { ReactComponent as Login } from "../resources/key.svg"
import { SearchInput } from "./SearchInput"

const Div = tw.div`
  flex
  bg-second
`

const HomeSvg = tw(Home)`
  scale-50
  mx-4 
  my-2 
  hover:fill-current 
  hover:text-third
`

const LoginSvg = tw(Login)`
scale-50
  mx-4 
  my-2 
  hover:fill-current 
  hover:text-third
`

const LoginBtn = tw.button`
  ml-auto
`

export const Navbar: React.FC = () => {
  return (
    <Div>
      <button>
        <HomeSvg />
      </button>
      <SearchInput />
      <LoginBtn>
        <LoginSvg />
      </LoginBtn>
    </Div>
  )
}
