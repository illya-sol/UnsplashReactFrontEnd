import { action, observable } from 'mobx'
import { createContext } from 'react'

class modalStore {
	@observable isRegActive = false
	@observable isRegShown = false
	@observable isLogActive = false
	@observable isLogShown = false

	@action
	flipRegister = () => {
		this.isRegActive = !this.isRegActive
	}
	@action
	switchModals = () => {
		this.isRegActive = false
		this.isRegShown = false
		this.isLogActive = true
		this.isLogShown = true
	}
	@action
	flipLogIn = () => {
		this.isLogActive = !this.isLogActive
	}
}

export const ModalStore = createContext(new modalStore())
