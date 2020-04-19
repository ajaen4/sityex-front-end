
import React from "react";

import ReactList from 'react-list';

import {getCountryCode, prettyCity} from 'components/UsefulFunctions/usefulFunctions';

function ScrollDestinations(props){

  const renderItem = (index, key) => {

      return  <div style = {{
                          borderTop: "1px solid",
                          borderColor: "#b2b4b8",
                          padding: "10px"
                        }}
                        className ="rowDirection">
                    <a href = {"destination/" + props.destinations[index].toString()}>
                      <div action key = {props.destinations[index].toString()} className ="rowDirection">
                        <img alt = "country flag" src = {require("assets/img/flags/" + getCountryCode(props.destinations[index]).countryCode + ".png")} style = {{
                          marginTop: "3px",
                          marginRight: "10px",
                          height: "20px"
                        }}></img>
                        <div className = "centerText" style = {{
                          marginTop: "3px"
                        }}>
                        {prettyCity(props.destinations[index])}
                        </div>
                      </div>
                    </a>
                  </div>;
        }

  return (
    <>
    <div style = {{overflow: 'auto', height: "400px", justifyContent: "center"}}>
      <ReactList style = {{
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center"
      }}
      itemRenderer = {renderItem}
      length = {props.destinations.length}
      type = 'uniform'
      />
    </div>
    </>
  );

}

export default ScrollDestinations;
