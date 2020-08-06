import React from "react"
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
`

const Sep = tw.pre`
   inline
   sm:w-0
   lg:w-64
`

export const SearchInput: React.FC = () => {
  return (
    <React.Fragment>
      <Sep />
      <Flexdiv>
        <Div>
          <Input type="text" placeholder="Search by keyword..." />
          <SearchSvg />
        </Div>
      </Flexdiv>
      <Sep />
    </React.Fragment>
  )
}
