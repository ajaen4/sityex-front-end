import React, {useEffect, createRef} from "react";

// reactstrap components
import { Container } from "reactstrap";

import {getCountryCode} from 'components/UsefulFunctions/usefulFunctions';

function DestinationPageHeader(props) {

  let pageHeader = createRef();

  var countryName = getCountryCode(props.cityName).country;

  useEffect(() => {

    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        if(pageHeader.current){
          pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
        }
      };
      window.addEventListener("scroll", updateScroll);

      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }

  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-medium"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/cityImage/" + props.cityName.replace(" ","-") + ".jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <h3 className="title capitalize">{props.cityName}</h3>
          <p className="category">{countryName}</p>
          <div className="content">
            <div className="social-description">
              <h2>0</h2>
              <b>Experiencias</b>
            </div>
            <div className="social-description">
              <h2>0</h2>
              <b>Alojamientos</b>
            </div>
            <div className="social-description">
              <h2>0</h2>
              <b>Personas</b>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default DestinationPageHeader;
