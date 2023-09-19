import React from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Review from 'components/Reviews/Review.jsx'
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import EmptyList from 'components/EmptyFill/EmptyList.jsx'

function ScrollReviews({ reviews, isFetching }) {

  const renderItem = (data, index) => (
    <ListItem key={index} sx={{justifyContent: "center"}}>
        <Review data={data} />
    </ListItem>
  )

  if (isFetching) {
    return <LoadingSpinner />
  }

  return (
    <div sx={{ overflow: 'auto', height: "400px"}}>
      {(reviews.length !== 0) &&
        <List>
          {reviews.map((review, index) => renderItem(review, index))}
        </List>
      }
      {(reviews.length === 0) &&
        <EmptyList message="There are no reviews yet, be the first to create one!" />
      }
    </div>
  )
}

export default ScrollReviews
