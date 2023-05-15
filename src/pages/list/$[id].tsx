import ProductList from "@/components/List";
import { useParams } from "react-router";

export default function List() {
  const { id } = useParams();
  return <ProductList id={id} />;
}
