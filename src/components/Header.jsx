import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link as RouteLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/auth-slice";
import LogoutButton from "./utility/LogoutButton";

const activeClassName = ( { isActive } ) => ( isActive ? "active" : undefined );

function Header() {
  const sessionId = useSelector( ( state ) => state.auth.sessionId );
  const userId = useSelector( ( state ) => state.auth.userId );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  function logoutHandler() {
    dispatch( logoutUser( { sessionId, userId } ) )
      .then( ( { error } ) => {
        if ( error ) {
          console.log( error )
          toast( {
            title: "Logged out failed",
            status: "error",
            colorScheme: "red",
          } );
        } else {
          navigate( "/login" );
          toast( {
            title: "Logged out successfully",
            status: "success",
            colorScheme: "teal",
          } );
        }
      } )
  }

  return (
    <Flex
      py={2}
      px={8}
      justify={"space-between"}
      alignItems={"center"}
      bgColor={"lightgray"}
      position={"sticky"}
      top={0}
      zIndex={"sticky"}
      w={"100vw"}
    >
      <Flex>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          color={"teal.400"}
          onClick={() => navigate( "/dashboard" )}
          cursor={"pointer"}
        >
          ExpenseCare
        </Text>
      </Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        gap={10}
        fontSize={"lg"}
        fontWeight={"normal"}
        alignItems={"center"}
      >
        <NavLink as={RouteLink} to={"/dashboard"} className={activeClassName}>
          <Text _hover={{ textColor: "teal.400" }}> Dashboard </Text>
        </NavLink>
        <NavLink
          as={RouteLink}
          to={"/all-expenses"}
          className={activeClassName}
        >
          <Text _hover={{ textColor: "teal.400" }}> All Expenses </Text>
        </NavLink>
        <NavLink
          as={RouteLink}
          _hover={{ textDecor: "none", fontWeight: "medium" }}
          to={"/charts"}
          fontSize={"large "}
          className={activeClassName}
        >
          <Text _hover={{ textColor: "teal.400" }}> Charts </Text>
        </NavLink>

        <Menu>
          <MenuButton
            as={Button}
            bgColor={"inherit"}
            _hover={{ bgColor: "inherit", fontWeight: "medium" }}
            rightIcon={<ChevronDownIcon />}
            fontSize={"large "}
            fontWeight={"normal"}
            _active={{ bg: "inherit", fontWeight: "medium" }}
          >
            Account
          </MenuButton>
          <MenuList bgColor={"lightgray"}>
            {/* <MenuItem bgColor={"lightgray"}>Profile</MenuItem> */}
            <MenuItem
              as={RouteLink}
              to={"/help"}
              bgColor={"lightgray"}
              _hover={{ bgColor: "teal.400" }}
            >
              Help
            </MenuItem>
            <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.400" }}>
              <LogoutButton logoutHandler={logoutHandler} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex display={{ md: "none" }}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="options"
            icon={<HamburgerIcon />}
            color={"text"}
            bgColor={"teal.500"}
            _hover={{ bgColor: "teal.400" }}
            _active={{ bgColor: "teal.400" }}
          />
          <MenuList bgColor={"lightgray"}>
            <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.500" }}>
              <NavLink
                as={RouteLink}
                _hover={{ textDecor: "none", fontWeight: "medium" }}
                to={"/dashboard"}
                className={activeClassName}
              >
                Dashboard
              </NavLink>
            </MenuItem>
            <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.500" }}>
              <NavLink
                as={RouteLink}
                _hover={{ textDecor: "none", fontWeight: "medium" }}
                to={"/all-expenses"}
                className={activeClassName}
              >
                All Expenses
              </NavLink>
            </MenuItem>
            <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.500" }}>
              <NavLink
                as={RouteLink}
                _hover={{ textDecor: "none", fontWeight: "medium" }}
                to={"/charts"}
                className={activeClassName}
              >
                Charts
              </NavLink>
            </MenuItem>
            <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.500" }}>
              <NavLink
                as={RouteLink}
                _hover={{ textDecor: "none", fontWeight: "medium" }}
                to={"/help"}
                className={activeClassName}
              >
                Help
              </NavLink>
            </MenuItem>
            {/* <MenuItem bgColor={"lightgray"} _hover={{ bgColor: "teal.500" }}>
              Account
            </MenuItem> */}
            {/* <MenuItem
              bgColor={"lightgray"}
              _hover={{ bgColor: "teal.500" }}
              onClick={logoutHandler}
            >
              Logout
            </MenuItem> */}
            <LogoutButton logoutHandler={logoutHandler} />
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default Header;
