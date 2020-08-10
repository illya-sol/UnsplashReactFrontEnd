import React, { useContext } from 'react'
import { bounceIn } from 'react-animations'
import { useForm } from 'react-hook-form'
import styled, { keyframes } from 'styled-components'
import tw from 'twin.macro'
import { ModalStore } from '../../store/MobxStore'

const animation = keyframes`${bounceIn}`

const Div = tw.div`
  z-50
  absolute
  rounded
  w-full 
  h-full
  max-h-full
  max-w-full
`

const Ddiv = styled(Div)`
  animation: 1s ${animation}  
`

const Form = tw.form`
  bg-fourth 
  shadow-modal  
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

const DivEmail = tw.div`
  mb-6
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

const Ppassword = tw.p`
  text-white
  text-xs 
  italic
`

const DivSubmit = tw.div`
  flex 
  items-center 
  justify-between
`

const ButtonSubmit = tw.button`
  bg-second
  hover:bg-first
  text-white 
  font-bold 
  py-2 
  px-4 
  rounded 
  focus:outline-none 
  focus:shadow-outline
`

const A = tw.a`
  inline-block 
  align-baseline 
  font-bold 
  text-sm 
  text-gray-500
  hover:text-white
`

export const Register: React.FC = () => {
	const { register, handleSubmit, errors } = useForm()
	const flipModal = useContext(ModalStore).flipModal

	const onSubmit = () => {}
	return (
		<Ddiv onClick={flipModal}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<DivUsername>
					<Label htmlFor="username">Username</Label>
					<InputUser
						ref={register}
						id="username"
						name="username"
						type="text"
						placeholder="Username"
						autoComplete="name"
					/>
				</DivUsername>
				<DivEmail>
					<Label htmlFor="email">
						Email
						{errors.email && errors.email.message}
					</Label>
					<InputUser
						ref={register({
							required: 'Required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'invalid email address'
							}
						})}
						id="email"
						name="email"
						type="text"
						placeholder="Email"
						autoComplete="email"
					/>
				</DivEmail>
				<DivPassword>
					<Label htmlFor="password">Password</Label>
					<InputPassword
						ref={register}
						id="password"
						name="password"
						type="password"
						placeholder="******************"
						autoComplete="current-password"
					/>
					<Ppassword>Please choose a password.</Ppassword>
				</DivPassword>
				<DivSubmit>
					<ButtonSubmit type="submit">Sign In</ButtonSubmit>
					<A href="/forgotpass">Forgot Password?</A>
				</DivSubmit>
			</Form>
		</Ddiv>
	)
}
