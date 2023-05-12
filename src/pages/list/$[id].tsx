import ProductList from "@/components/lists";
import { useParams } from "react-router";

export default function List() {
  const { id } = useParams();
  return <ProductList id={id} />;
}
