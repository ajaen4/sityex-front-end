import React, { useEffect } from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Experience from 'components/Experiences/Experience.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import EmptyList from 'components/EmptyFill/EmptyList.jsx'

function ScrollExperiences({ experiences, isFetching, getExperiencesPagination }) {

  const onScroll = (argument) => {
  }

  const renderItem = (data, index) => (
    <ListItem key={index} sx={{justifyContent: "center"}}>
        <Experience data={data} onScroll={onScroll} />
    </ListItem>
  )

  useEffect(() => {
    const unsubscribe = () => window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll)
    return unsubscribe
  }, [])

  if (isFetching) {
    return <LoadingSpinner />
  }

  return (
    <div sx={{ overflow: 'auto', height: "400px"}}>
      {(experiences.length !== 0) &&
        <List>
          {experiences.map((experience, index) => renderItem(experience, index))}
        </List>
      }
      {(experiences.length === 0) &&
        <EmptyList message="Aun no hay experiencias, se el primero en rellenar una!" />
      }
    </div>
  )
}

export default ScrollExperiences
