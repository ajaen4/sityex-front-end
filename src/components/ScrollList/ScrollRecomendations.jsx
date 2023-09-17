import React from 'react'
import ReactList from 'react-list'
import { Button, Grid, Card, CardContent } from '@mui/material'

function ScrollRecomendations({ currRecomendations, deleteRec, windowWidth }) {
  const [recomendations, setRecomendations] = React.useState(currRecomendations)
  const [scrollHeight, setScrollHeight] = React.useState("0px")

  React.useEffect(() => {
    if (windowWidth < 800 && currRecomendations.length === 0) {
      setScrollHeight("0px")
    }
    else {
      setScrollHeight(windowWidth > 800 ? "500px" : "200px")
    }
    setRecomendations(currRecomendations)
  }, [windowWidth, currRecomendations])

  const deleteRecom = (event) => {
    deleteRec(parseInt(event._targetInst.key))
  }

  const renderItem = (index, key) => {
    return (
      <Card style={{
        width: '80%',
        marginTop: '5px',
        marginBottom: '5px'
      }}
        key={recomendations[index].name.toString()}>
        <CardContent>
          <Grid container style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <Grid item lg={3} md={12} sm={12} style={{ maxWidth: '70px' }}>
              <img alt='recomendations from users' src={require('assets/icons/pin_blue.png')}></img>
            </Grid>
            <Grid item lg={6} md={12} sm={12} style={{
              textAlign: 'center'
            }}>
              {recomendations[index].name.trim()}
            </Grid>
            <Grid item lg={3} md={12} sm={12}>
              <Button variant="contained" color="secondary" onClick={deleteRecom}>
                <i key={index} className="now-ui-icons ui-1_simple-remove"></i>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div style={{ overflow: 'auto', height: scrollHeight, justifyContent: 'center' }}>
        <ReactList style={{ marginTop: '10px', marginBottom: '10px', justifyContent: 'center' }}
          itemRenderer={renderItem}
          length={recomendations.length}
          type='uniform'
        />
      </div>
    </>
  )
}

export default ScrollRecomendations
