import {
  Container,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

function Header() {
  return (
    <Flex
      py={2}
      px={8}
      justify={"space-between"}
      alignItems={"center"}
      bgColor={"lightgray"}
    >
      <Flex>
        <Text fontSize={"3xl"} fontWeight={"bold"} color={"teal.400"}>
          ExpenseCare
        </Text>
      </Flex>
      <Flex gap={10} fontSize={"xl"} fontWeight={"normal"}>
        <Link as={RouteLink} to={"/dashboard"}>
          Dashboard
        </Link>
        <Link as={RouteLink} to={"/all-expenses"}>
          All Expenses
        </Link>
        <Link as={RouteLink} to={"/charts"}>
          Charts
        </Link>
        <Menu>
          <MenuButton>Account</MenuButton>
          <MenuList bgColor={"lightgray"}>
            <MenuItem bgColor={"lightgray"}>Profile</MenuItem>
            <MenuItem bgColor={"lightgray"}>Help</MenuItem>
            <MenuItem bgColor={"lightgray"}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default Header;
