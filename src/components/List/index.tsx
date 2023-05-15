import Typography from "@mui/material/Typography";
import { Box, Link, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSetState, useUpdateEffect } from "ahooks";
import Breadcrumb from "#lib/Breadcrumb";
import EmptyIcon from "@assets/icons/empty.svg";
import Layout from "#lib/Layout";
import { enqueueSnackbar } from "notistack";
import { getProductList } from "@/api/product";
import { useRequest } from "ahooks";
import { addToCart } from "@/api/cart";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router";
import ProductListSkeleton from "../skeleton/ProductListSkeleton";
import { addWish, removeWish } from "@/api/account";
import ListHeader from "./ListHeader";
import ListFilter from "./ListFilter";
import ProductList from "./ProductList";

interface Props {
  id?: string;
}

const List: React.FC<Props> = ({ id }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    data: productsInfo,
    refresh,
    run,
  } = useRequest<any, [API.ProductListParams]>(
    async (params) => {
      const res = await getProductList(params);
      setLoading(false);
      return res;
    },
    {
      defaultParams: [{ category_id: id }],
      debounceWait: 300,
    }
  );

  const handleAddToCart = async (id: number, count: number) => {
    await addToCart(id, count);
    refresh();
    enqueueSnackbar(`You've added ${count} item(s) to your cart.`);
  };

  const handleAddWish = async (id: string, wished: number) => {
    if (wished == 0) {
      await addWish(id);
      enqueueSnackbar("Added successfuly.");
    } else {
      await removeWish(id);
    }
    refresh();
  };

  const [urlState, setUrlState] = useSetState<API.ProductListParams>({
    category_id: id,
    page: 1,
    page_size: 30,
    ...qs.parse(location.search),
  });

  useUpdateEffect(() => {
    navigate(`?${qs.stringify(urlState)}`);
  }, [urlState]);

  useEffect(() => {
    const state = {
      category_id: id,
      page: 1,
      page_size: 30,
      ...qs.parse(location.search),
    };
    setLoading(true);
    run(state);
  }, [location]);

  return (
    <Layout title={productsInfo?.category?.name}>
      <Breadcrumb>
        <Link href="/" color="inherit">
          Home
        </Link>
        {productsInfo?.nav?.map((item: any, index: number) => {
          return item.current == 1 ? (
            <Typography color="secondary.main" fontSize={"1.2rem"} key={index}>
              {item.name}
            </Typography>
          ) : (
            <Link href={`/list/${item.id}`} color="inherit" key={index}>
              {item.name}
            </Link>
          );
        })}
      </Breadcrumb>
      <Box display={"flex"} justifyContent={"space-between"} pb={6}>
        <ListFilter
          urlState={urlState}
          onChange={setUrlState}
          productsInfo={productsInfo}
        />

        <Box flex={"0 0 auto"} width={840}>
          <ListHeader urlState={urlState} onChange={setUrlState} />

          {loading ? (
            <ProductListSkeleton />
          ) : productsInfo?.products?.data?.length > 0 ? (
            <>
              <ProductList
                urlState={urlState}
                products={productsInfo?.products}
                onAddCart={handleAddToCart}
                onAddWish={handleAddWish}
                onPaginationChange={setUrlState}
              />
            </>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              height={300}
            >
              <Box>
                <img src={EmptyIcon} />
              </Box>
              <Typography>No data</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default List;
