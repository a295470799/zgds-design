import ProductList from "@/components/list/ProductList";
import { useParams } from "react-router";

export default function List() {
  const { id } = useParams();
  return <ProductList id={id} />;
}
