
import React, {useEffect} from "react"
import { Link, withRouter } from "react-router-dom"

import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap"

//Custom components
import NotificationsDropDown from "components/DropDownList/NotificationsDropDown"

//Custom functionality
import * as ROUTES from 'constants/routes'
import { signOutUser } from 'actions'

const chooseNavbarColor = (history) => {
  const currPath = history.location.pathname.split("/")[1]
  const destinationPath = ROUTES.DESTINATION.split("/")[1]
  if(currPath === destinationPath){
      return "transparent"
    }
  else {
    return "info"
  }
}

const NavbarErasmus = ({ history, auth, isAuthResolved }) => {
  
  const CHANGE_NOTIFICATIONS_POSITION = 400

  const [navbarColor, setNavbarColor] = React.useState(chooseNavbarColor(history))
  const [collapseOpen, setCollapseOpen] = React.useState(false)

  const [windowDimensions, setWindowDimensions] = React.useState(window.innerWidth)
  //const [isOpen, setIsOpen] = React.useState(false)

  /*const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }*/

  //Updates the window dimensions (width) when this changes
  const updateWindowDimensions = () => setWindowDimensions(window.innerWidth)

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("info")

      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor(chooseNavbarColor(history))
      }
    }
    window.addEventListener("resize", updateWindowDimensions)

    window.addEventListener("scroll", updateNavbarColor)
    document.body.classList.add("sidebar-collapse")

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor)
      document.body.classList.remove("sidebar-collapse")
      window.removeEventListener("resize", updateWindowDimensions)

    }
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setNavbarColor(chooseNavbarColor(history))
  // eslint-disable-next-line
  }, [history.location.pathname])

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open")
            setCollapseOpen(false)
          }}
        />
      ) : null}
      <Navbar className = "fixed-top" color = {navbarColor} expand="lg">
        <Container>
          <div className="navbar-translate">
            {((windowDimensions < CHANGE_NOTIFICATIONS_POSITION) && auth) && <NotificationsDropDown messages = {auth.messages !== undefined ? auth.messages : []} windowDimensions = {windowDimensions}/>}
            <NavbarBrand
              target="_blank"
              id="navbar-brand"
            >
              EramusProject
            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open")
                setCollapseOpen(!collapseOpen)
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              { isAuthResolved &&
                <React.Fragment>
                  <NavItem>
                    <NavLink to="/new-housemate" tag={Link}>
                      Comparte apartamento
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/new-experience" tag={Link}>
                      Nueva opinion
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/Home" tag={Link}>
                      Destinos
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    {((windowDimensions > CHANGE_NOTIFICATIONS_POSITION) && auth) && <NotificationsDropDown messages = {auth.messages !== undefined ? auth.messages : []} windowDimensions = {windowDimensions}/>}
                  </NavItem>
                </React.Fragment>
              }
              <NavItem>
                <NavLink href="#">
                  Algun problema?
                </NavLink>
              </NavItem>
              { isAuthResolved &&
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="default"
                    data-toggle="dropdown"
                    href="#pablo"
                    id="navbarDropdownMenuLink"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    {" " + auth.userName + " "}
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                    <DropdownItem
                      href="/chat"
                    >
                      <b>Chat</b>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <b>Mis destinos</b>
                    </DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem
                      href="/profile"
                    >
                      Perfil
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Ayuda
                    </DropdownItem>
                    <DropdownItem
                      onClick = {e => signOutUser(auth.id)}
                    >
                      Cerrar sesion
                    </DropdownItem>
                  </DropdownMenu>
              </UncontrolledDropdown>
            }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default withRouter(NavbarErasmus)
