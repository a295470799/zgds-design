import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@assets/icons/account/dashboard.svg";
import DashboardActiveIcon from "@assets/icons/account/dashboard-active.svg";
import InformationIcon from "@assets/icons/account/information.svg";
import InformationActiveIcon from "@assets/icons/account/information-active.svg";
import OrdersIcon from "@assets/icons/account/orders.svg";
import OrdersActiveIcon from "@assets/icons/account/orders-active.svg";
import CiIcon from "@assets/icons/account/ci.svg";
import CiActiveIcon from "@assets/icons/account/ci-active.svg";
import WishlistIcon from "@assets/icons/account/wishlist.svg";
import WishlistActiveIcon from "@assets/icons/account/wishlist-active.svg";
import SignOutIcon from "@assets/icons/account/sign_out.svg";
import SignOutActiveIcon from "@assets/icons/account/sign_out-active.svg";

type Props = {
  code?: "dashboard" | "information" | "orders" | "ci" | "wishlist" | "signout";
};

const StyledBox = styled(Box)`
  li {
    margin-bottom: 20px;
    &:hover,
    &.active {
      background: #fff;
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      a {
        font-weight: 700;
      }
      &.dashboard a::before {
        background: url(${DashboardActiveIcon}) no-repeat center;
      }
      &.information a::before {
        background: url(${InformationActiveIcon}) no-repeat center;
      }
      &.orders a::before {
        background: url(${OrdersActiveIcon}) no-repeat center;
      }
      &.ci a::before {
        background: url(${CiActiveIcon}) no-repeat center;
      }
      &.wishlist a::before {
        background: url(${WishlistActiveIcon}) no-repeat center;
      }
      &.sign-out a::before {
        background: url(${SignOutActiveIcon}) no-repeat center;
      }
    }
    &.dashboard a::before {
      background: url(${DashboardIcon}) no-repeat center;
    }
    &.information a::before {
      background: url(${InformationIcon}) no-repeat center;
    }
    &.orders a::before {
      background: url(${OrdersIcon}) no-repeat center;
    }
    &.ci a::before {
      background: url(${CiIcon}) no-repeat center;
    }
    &.wishlist a::before {
      background: url(${WishlistIcon}) no-repeat center;
    }
    &.sign-out a::before {
      background: url(${SignOutIcon}) no-repeat center;
    }
    a {
      display: flex;
      align-items: center;
      width: 200px;
      height: 42px;
      padding-left: 10px;
      color: ${(props) => props.theme.palette.primary.main};
      font-size: 1.2rem;
      font-weight: 500;
      ::before {
        content: "";
        width: 30px;
        height: 30px;
        margin-right: 14px;
      }
    }
  }
`;

const AccountSide: React.FC<Props> = (props) => {
  const { code = "dashboard" } = props;
  return (
    <StyledBox width="200px">
      <ul>
        <li className={`dashboard${code == "dashboard" ? " active" : ""}`}>
          <Link href="/account" underline="none">
            Dashboard
          </Link>
        </li>
        <li className={`information${code == "information" ? " active" : ""}`}>
          <Link href="/account/information" underline="none">
            Account Information
          </Link>
        </li>
        <li className={`orders${code == "orders" ? " active" : ""}`}>
          <Link href="/account/orders" underline="none">
            My Orders
          </Link>
        </li>
        <li className={`ci${code == "ci" ? " active" : ""}`}>
          <Link href="/account/ciManagement" underline="none">
            CI Management
          </Link>
        </li>
        <li className={`wishlist${code == "wishlist" ? " active" : ""}`}>
          <Link href="/account/wishlist" underline="none">
            My Wishlist
          </Link>
        </li>
        <li className={`sign-out${code == "signout" ? " active" : ""}`}>
          <Link href="#" underline="none">
            Sign Out
          </Link>
        </li>
      </ul>
    </StyledBox>
  );
};

export default AccountSide;
