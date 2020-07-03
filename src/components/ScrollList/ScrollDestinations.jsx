
import React from "react";

import ReactList from 'react-list';

import { prettyCity } from 'helpers/usefulFunctions.js';

function ScrollDestinations({destinations}){

  const renderItem = (index, key) => {

      return  <div style = {{
                          borderTop: "1px solid",
                          borderColor: "#b2b4b8",
                          padding: "10px"
                        }}
                        className ="rowDirection"
                    key = {destinations[index].name.toString()}>
                    <a href = {"destination/" + destinations[index].name.toString()}>
                      <div key = {destinations[index].name.toString()} className ="rowDirection">
                        <img alt = "country flag" src = {require("assets/img/flags/" + destinations[index].countryCode + ".png")} style = {{
                          marginTop: "3px",
                          marginRight: "10px",
                          height: "20px"
                        }}></img>
                        <div className = "centerText" style = {{
                          marginTop: "3px"
                        }}>
                        {prettyCity(destinations[index].name)}
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
      length = {destinations.length}
      type = 'uniform'
      />
    </div>
    </>
  );

}

export default ScrollDestinations;
