import React, { useContext } from 'react'
import tw from 'twin.macro'
import { ReactComponent as Home } from '../resources/home.svg'
import { ReactComponent as Login } from '../resources/key.svg'
import { ModalStore } from '../store/MobxStore'
import { SearchInput } from './SearchInput'

const Div = tw.div`
  z-10
  flex
  fixed
  bg-first
  min-w-full
  shadow-navbar
`

const HomeSvg = tw(Home)`
  scale-50
  mx-4 
  my-2 
  fill-second
  group-hover:fill-third 
`

const LoginSvg = tw(Login)`
  scale-50
  mx-4 
  my-2 
  fill-second
  group-hover:fill-third 
`

const LoginBtn = tw.button`
  ml-auto
`

export const Navbar: React.FC = () => {
	const flipModal = useContext(ModalStore).flipModal

	return (
		<Div>
			<button className="group">
				<HomeSvg />
			</button>
			<SearchInput />
			<LoginBtn className="group" onClick={flipModal}>
				<LoginSvg />
			</LoginBtn>
		</Div>
	)
}
