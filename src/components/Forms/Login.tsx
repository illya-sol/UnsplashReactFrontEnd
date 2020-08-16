import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { fadeInDown, fadeOutDown } from 'react-animations'
import { useForm } from 'react-hook-form'
import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import { ModalStore } from '../../store/MobxStore'

const Div = tw.div`
  z-50
  absolute
  rounded
  w-full 
  h-full
  max-h-full
  max-w-full
`
const Blocker = tw.div`
  fixed
  top-0
  left-0
  right-0
  bottom-0
  bg-black
  opacity-50
`

const Form = tw.form`
  fixed
  bg-first 
  rounded 
  mt-24
  px-8 
  pt-6 
  pb-8
  md:left-0
  md:right-0
  md:ml-auto
  md:mr-auto
  w-full 
  max-w-lg
`

const animationIn = keyframes`${fadeInDown}`
const animationOut = keyframes`${fadeOutDown}`

const AnForm = styled(Form)`
  animation 1s ${(props) => (props!['aria-disabled'] ? animationIn : animationOut)}
`

const DivUsername = tw.div`
  mb-4
`

const Label = tw.label`
  block 
  text-white
  text-sm 
  font-bold
  mb-2
`

const WarningLabel = tw(Label)`
  text-red-500
`

const InputUser = tw.input`
  shadow 
  appearance-none 
  border 
  rounded
  w-full
  py-2
  px-3
  text-gray-700 
  leading-tight 
  focus:outline-none 
  focus:shadow-outline
`

const DivPassword = tw.div`
  mb-8
`
const InputPassword = tw.input`
  shadow
  appearance-none
  border 
  border-red-500
  rounded 
  w-full 
  py-2
  px-3 
  text-gray-700 
  mb-3 
  leading-tight 
  focus:outline-none 
  focus:shadow-outline
`

const Password = tw.p`
  text-white
  text-sm
  italic
`

const DivSubmit = tw.div`
  flex 
  items-center 
  justify-between
`

const ButtonSubmit = tw.button`
  font-bold 
  py-2 
  px-4 
  rounded 
  focus:outline-none 
  focus:shadow-outline
  bg-white
  text-third
  hover:bg-third
  hover:text-second
`

const A = tw.a`
  inline-block 
  align-baseline 
  font-bold 
  text-sm
  text-second
  hover:text-third
`

export const Login: React.FC = observer(() => {
	const { register, handleSubmit, errors } = useForm({
		criteriaMode: 'firstError'
	})
	const store = useContext(ModalStore)

	const fadeOut = () => {
		store!.isLogActive = false
		setTimeout(() => {
			store!.isLogShown = false
		}, 1000)
	}

	const onSubmit = () => {
		console.log('smh')
	}
	return (
		<Div style={store!.isLogShown ? { visibility: 'visible' } : { visibility: 'hidden' }}>
			<Blocker onClick={fadeOut} />
			<AnForm aria-disabled={store!.isLogActive} onSubmit={handleSubmit(onSubmit)}>
				<DivUsername>
					<Label htmlFor="username">Username or Email</Label>
					<InputUser
						ref={register()}
						id="username"
						name="username"
						type="text"
						placeholder="Username"
						autoComplete="name"
					/>
					<WarningLabel>{errors.username && errors.username.message}</WarningLabel>
				</DivUsername>
				<DivPassword>
					<Label htmlFor="password">Password</Label>
					<InputPassword
						ref={register({
							required: 'Password is Required!',
							minLength: {
								value: 3,
								message: 'Password must be at least 3 characters!'
							},
							maxLength: {
								value: 30,
								message: 'Password must be less than 30 characters!'
							}
						})}
						id="password"
						name="password"
						type="password"
						placeholder="******************"
						autoComplete="current-password"
					/>
					<WarningLabel>{errors.password && errors.password.message}</WarningLabel>
					<Password>Please choose a password</Password>
				</DivPassword>
				<DivSubmit>
					<ButtonSubmit type="submit">Sign In</ButtonSubmit>
					<A href="#" onClick={store!.switchModals}>
						Register?
					</A>
				</DivSubmit>
			</AnForm>
		</Div>
	)
})
