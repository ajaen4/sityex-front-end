
import *  as api from 'api'

export const getExperiences = (cityName) => api.doGetExperiences(cityName)

export const addExperience = (cityName, experience, markers) => api.doAddExperience(cityName, experience, markers)
