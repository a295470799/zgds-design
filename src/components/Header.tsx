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
  const categorys = [
    {
      id: 1,
      name: "Home Furniture",
      parent_id: 0,
      categorys: [
        {
          id: 2,
          name: "Living Room",
          parent_id: 1,
          categorys: [
            { id: 3, name: "Bookcases", parent_id: 2 },
            { id: 4, name: "End Tables", parent_id: 2 },
            { id: 5, name: "Chairs", parent_id: 2 },
            { id: 6, name: "TV & Media Furniture", parent_id: 2 },
            { id: 7, name: "Coffee Tables", parent_id: 2 },
            { id: 8, name: "Console & Sofa Tables", parent_id: 2 },
            { id: 10, name: "Ladder Shelves", parent_id: 2 },
          ],
        },
        {
          id: 12,
          name: "Home Office",
          parent_id: 1,
          categorys: [
            { id: 13, name: "Cabinets,Racks & Shelves", parent_id: 12 },
            { id: 14, name: "Chairs & Stools", parent_id: 12 },
            { id: 15, name: "Desks & Workstations", parent_id: 12 },
          ],
        },
        {
          id: 16,
          name: "Bathroom",
          parent_id: 1,
          categorys: [
            { id: 17, name: "Bathroom Sets", parent_id: 16 },
            { id: 18, name: "Shower Organiser", parent_id: 16 },
            { id: 19, name: "Mirror Cabinets", parent_id: 16 },
            { id: 20, name: "Over-the-Toilet Storage", parent_id: 16 },
            { id: 21, name: "Bathroom Shelves", parent_id: 16 },
          ],
        },
        {
          id: 22,
          name: "Bedroom",
          parent_id: 1,
          categorys: [
            { id: 23, name: "Bedside Tables", parent_id: 22 },
            { id: 24, name: "Dressing Tables", parent_id: 22 },
            { id: 25, name: "Trunks and chests of drawers", parent_id: 22 },
            { id: 26, name: "Beds,Frames & Bases", parent_id: 22 },
          ],
        },
        {
          id: 27,
          name: "Laundry Room",
          parent_id: 1,
          categorys: [
            { id: 28, name: "Laundry Baskets", parent_id: 27 },
            { id: 29, name: "Pop-Up Laundry Hampers", parent_id: 27 },
          ],
        },
        {
          id: 30,
          name: "Hallway/Entryway",
          parent_id: 1,
          categorys: [
            { id: 31, name: "Coat Racks", parent_id: 30 },
            { id: 32, name: "Storage Benches", parent_id: 30 },
          ],
        },
        {
          id: 33,
          name: "Kid's Room",
          parent_id: 1,
          categorys: [
            { id: 34, name: "Shelves", parent_id: 33 },
            { id: 35, name: "Toy Chests & Boxes", parent_id: 33 },
          ],
        },
        {
          id: 36,
          name: "Accent Furniture",
          parent_id: 1,
          categorys: [{ id: 37, name: "Storage Cabinets", parent_id: 36 }],
        },
        {
          id: 38,
          name: "Game & Recreation Room",
          parent_id: 1,
          categorys: [{ id: 39, name: "Bar & Serving Carts", parent_id: 38 }],
        },
        {
          id: 40,
          name: "Reception furniture",
          parent_id: 1,
          categorys: [{ id: 41, name: "Umbrella stands", parent_id: 40 }],
        },
        {
          id: 44,
          name: "Home Accessories",
          parent_id: 1,
          categorys: [
            {
              id: 45,
              name: "Photo Albums,Frames & Accessories",
              parent_id: 44,
            },
          ],
        },
        {
          id: 46,
          name: "Home Care & Cleaning",
          parent_id: 1,
          categorys: [{ id: 47, name: "Bin Liners", parent_id: 46 }],
        },
      ],
    },
  ];

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
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </StyledSearch>
        <StyledIcons>
          <IconButton href="/account" target="_blank">
            <img src={UserIcon} />
          </IconButton>
          <IconButton href="/account/wish">
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
                <Link href="/" className="nav-level2">
                  SONGMICS
                </Link>
                <Link href="/" className="nav-level2">
                  VASAGLE
                </Link>
                <Link href="/" className="nav-level2">
                  FEANDREA
                </Link>
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
