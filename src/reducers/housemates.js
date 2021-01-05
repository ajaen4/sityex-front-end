import { combineReducers } from 'redux'

import {
  SAVING_HOUSEMATE,
  SAVING_HOUSEMATE_SUCCESS } from 'types'

const initHousemates = () => {

  const isFetching = (state = false, action) => {
    switch(action.type){
      case SAVING_HOUSEMATE:
        return true
      case SAVING_HOUSEMATE_SUCCESS:
        return false
      default: return state
    }
  }

  return combineReducers({
    isFetching
  })
}

const Housemates = initHousemates()

export default Housemates
