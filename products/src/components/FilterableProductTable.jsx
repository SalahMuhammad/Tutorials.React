import { useState } from "react";
import ProductTable from "./product/ProductTable";
import SearchBar from "./SearchBar";

export default function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        products={products} 
      />
    </div>
  );
}