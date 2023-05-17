import { styled, keyframes } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImageComponent from "#lib/Image";
import UserIcon from "@assets/icons/user.svg";
import HeartIcon from "@assets/icons/heart.svg";
import CartIcon from "@assets/icons/cart.svg";
import LogoImg from "@assets/images/logo.png";
import { useState } from "react";
import { useLocation } from "react-router";
import qs from "query-string";
import { getCategorys } from "@/api/common";
import { useRequest } from "ahooks";
import { BRAND_CATEGORYS } from "@/constants/common";

const StyledHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
`;

const StyledLogo = styled("div")`
  img {
    display: block;
  }
`;

const StyledSearch = styled("div")`
  width: 380px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  & .MuiButtonBase-root {
    padding: 5px;
  }
  & .MuiInputBase-input {
    font-size: 1.4rem;
    padding: 0;
  }
`;

const StyledIcons = styled("div")`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;
`;

const NavWrapper = styled("ul")`
  display: flex;
  column-gap: 60px;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  font-size: 1.4rem;
  position: relative;
  .nav-level1 {
    display: block;
    font-weight: 500;
    position: relative;
    padding: 10px 0 8px;
    border-bottom: 2px solid transparent;
    color: ${(props) => props.theme.palette.text.primary};
  }
  .nav-level2 {
    font-weight: 500;
    color: #222;
    font-size: 1.2rem;
  }
  .nav-level3 {
    color: #777;
    font-size: 1.2rem;
  }
`;

const NavDropdown = styled("ul")`
  position: absolute;
  left: 0;
  z-index: 111;
  background: #fff;
  transition-delay: 80ms;
  padding: 30px 40px;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 20px;
  display: none;
`;

const rotate = keyframes`
  0% {
        opacity: 0;
        max-height: 0;
        height: 0;
        visibility: hidden;
        display: none;
    }
    9% {
        opacity: 0;
        max-height: 0;
        height: 0;
        visibility: hidden;
        display: none;
    }
    10% {
        opacity: 0;
        max-height: 1000px;
        height: auto;
        display: block;
        visibility: visible;
    }
    100% {
        opacity: 1;
        max-height: 1000px;
        height: auto;
        display: block;
        visibility: visible;
    }
`;

const NavItem = styled("li")`
  :hover > ul {
    display: flex;
    animation: ${rotate} 800ms;
    animation-fill-mode: forwards;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.3);
    width: 100%;
  }
  :hover > .nav-level1 {
    color: #e14101;
    border-bottom: 2px solid #e14101;
    text-decoration: none;
  }
`;

const NavDropdownItem = styled("li")`
  flex: 0 0 auto;
  &.brand {
    display: flex;
    column-gap: 80px;
  }
  a {
    padding: 8px 0;
    display: block;
  }
`;

export default function Header() {
  const location = useLocation();
  const { k } = qs.parse(location.search);
  const [searchKey, setSearchKey] = useState<string>((k as string) ?? "");

  const handleSearch = () => {
    window.location.href = "/list?k=" + searchKey;
  };

  const { data: categorys = [] } = useRequest(getCategorys, {
    debounceWait: 500,
  });

  return (
    <Container>
      <StyledHeader>
        <StyledLogo>
          <Link href="/">
            <ImageComponent src={LogoImg} alt="logo" width={272} height={30} />
          </Link>
        </StyledLogo>
        <StyledSearch>
          <InputBase
            size="small"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Please enter a keyword"
            inputProps={{ "aria-label": "Please enter a keyword" }}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSearch();
              }
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </StyledSearch>
        <StyledIcons>
          <IconButton href="/account" target="_blank">
            <img src={UserIcon} />
          </IconButton>
          <IconButton href="/account/wishlist">
            <img src={HeartIcon} />
          </IconButton>
          <IconButton href="/cart">
            <img src={CartIcon} />
          </IconButton>
        </StyledIcons>
      </StyledHeader>
      <nav>
        <NavWrapper>
          <NavItem>
            <Link href="/" className="nav-level1">
              Brand
            </Link>
            <NavDropdown>
              <NavDropdownItem className="brand">
                {BRAND_CATEGORYS.map((item) => {
                  return (
                    <Link
                      key={item}
                      href={`/list?brand=${item}`}
                      className="nav-level2"
                    >
                      {item}
                    </Link>
                  );
                })}
              </NavDropdownItem>
            </NavDropdown>
          </NavItem>
          {categorys?.map((item: any) => {
            return (
              <NavItem key={item.id}>
                <Link href={`/list/${item.id}`} className="nav-level1">
                  {item.name}
                </Link>
                {Array.isArray(item?.categorys) && item.categorys.length > 0 ? (
                  <NavDropdown>
                    {item?.categorys?.map((child: any) => {
                      return (
                        <NavDropdownItem key={child.id}>
                          <Link
                            href={`/list/${child.id}`}
                            className="nav-level2"
                          >
                            {child.name}
                          </Link>
                          {Array.isArray(child?.categorys) &&
                          child.categorys.length > 0
                            ? child?.categorys?.map((child2: any) => {
                                return (
                                  <Link
                                    key={child2.id}
                                    href={`/list/${child2.id}`}
                                    className="nav-level3"
                                  >
                                    {child2.name}
                                  </Link>
                                );
                              })
                            : null}
                        </NavDropdownItem>
                      );
                    })}
                  </NavDropdown>
                ) : null}
              </NavItem>
            );
          })}
        </NavWrapper>
      </nav>
    </Container>
  );
}
