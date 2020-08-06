import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import tw from "twin.macro"
import { ReactComponent as Search } from "../resources/search.svg"

const Flexdiv = tw.div`
   flex-grow
`

const Div = tw.div`
   relative
   ml-auto
   my-2
`

const Input = tw.input`
   relative
   min-w-full
   w-full
   bg-white 
   shadow 
   rounded 
   border-0 
   p-3
   pr-12
`

const SearchSvg = tw(Search)`
  relative
  ml-auto
  -mt-12
  cursor-pointer
  hover:fill-current 
  hover:text-third
`

const Sep = tw.pre`
   inline
   sm:w-0
   lg:w-64
`

export const SearchInput: React.FC = () => {
  const history = useHistory()
  const Inputref = useRef<HTMLInputElement>(null)

  const Searchclick = () => {
    if (Inputref.current!.value !== "")
      history.push("/search/" + Inputref.current!.value)
  }

  return (
    <React.Fragment>
      <Sep />
      <Flexdiv>
        <Div>
          <Input
            ref={Inputref}
            type="text"
            placeholder="Search by keyword..."
          />
          <SearchSvg onClick={Searchclick} />
        </Div>
      </Flexdiv>
      <Sep />
    </React.Fragment>
  )
}
