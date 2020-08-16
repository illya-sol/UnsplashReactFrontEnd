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
	flipLogIn = () => {
		this.isLogActive = !this.isLogActive
	}
	@action
	switchModals = () => {
		this.isRegActive = true
		this.isRegShown = true
		this.isLogActive = false
		this.isLogShown = false
	}
}

export const ModalStore = createContext(new modalStore())
