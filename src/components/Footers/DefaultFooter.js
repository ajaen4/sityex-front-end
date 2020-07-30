/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  target="_blank"
                >
                  ERASMUSPROJECT
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a
              href=""
              target="_blank"
            >
              ERASMUSPROJECT
            </a>
            . Coded by{" "}
            <a
              href=""
              target="_blank"
            >
              Alberto Jaen
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
