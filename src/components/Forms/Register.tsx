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

const AnForm = styled(Form)`
  animation: 1s ${animation}  
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

export const Register: React.FC = () => {
	const { register, handleSubmit, errors } = useForm({
		criteriaMode: 'firstError'
	})
	const flipModal = useContext(ModalStore).flipModal

	const onSubmit = () => {}
	return (
		<Div>
			<Blocker onClick={flipModal} />
			<AnForm onSubmit={handleSubmit(onSubmit)}>
				<DivUsername>
					<Label htmlFor="username">Username</Label>
					<InputUser
						ref={register({
							required: 'Username is Required!',
							minLength: {
								value: 3,
								message: 'Username must be more than 3 characters!'
							},
							maxLength: {
								value: 30,
								message: 'Username must be less than 30 characters!'
							}
						})}
						id="username"
						name="username"
						type="text"
						placeholder="Username"
						autoComplete="name"
					/>
					<WarningLabel>{errors.username && errors.username.message}</WarningLabel>
				</DivUsername>
				<DivEmail>
					<Label htmlFor="email">Email</Label>
					<InputUser
						ref={register({
							required: 'Email is Required!',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'invalid email address!'
							}
						})}
						id="email"
						name="email"
						type="text"
						placeholder="Email"
						autoComplete="email"
					/>
					<WarningLabel>{errors.email && errors.email.message}</WarningLabel>
				</DivEmail>
				<DivPassword>
					<Label htmlFor="password">Password</Label>
					<InputPassword
						ref={register({
							required: 'Password is Required!',
							minLength: {
								value: 3,
								message: 'Password must be more than 3 characters!'
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
					<A href="/forgotpass">Forgot Password?</A>
				</DivSubmit>
			</AnForm>
		</Div>
	)
}
