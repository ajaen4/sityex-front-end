import React, {useEffect, createRef} from "react";

import { prettyCity } from 'helpers/usefulFunctions'
// reactstrap components
import { Container } from "reactstrap";

function DestinationPageHeader({cityName, countryName, numExp}) {

  let pageHeader = createRef();

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
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/cityImage/" + prettyCity(cityName).replace(" ","-") + ".jpg") + ")"
          }}
          ref = {pageHeader}
        ></div>
        <Container>
          <h3 className="title capitalize">{cityName}</h3>
          <p className="category">{countryName}</p>
          <div className="content">
            <div className="social-description">
              <h2>{numExp}</h2>
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
