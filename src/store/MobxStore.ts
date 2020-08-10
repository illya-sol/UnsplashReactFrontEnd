import { action, observable } from 'mobx'
import { createContext } from 'react'

class modalStore {
  @observable isActive = false

  @action flipModal = () => {
    this.isActive = !this.isActive
  }
}

export const ModalStore = createContext(new modalStore())
