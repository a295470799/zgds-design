import request from "@/utils/request";

// /**
//  * 获取产品信息
//  * @returns
//  */
// export const getProductInfo = (sku: string) => {
//   return request({
//     method: "POST",
//     url: "/api/account/getCountrys",
//   }).then((res) => {
//     return res.data;
//   });
// };

/**
 * 获取产品信息
 * @returns
 */
export const getProductInfo = (sku: string) => {
  return request({
    method: "POST",
    url: "/api/account/getCountrys",
  }).then((res) => {
    return {
      product: {
        id: 1842,
        sku: "HSR13S",
        asin: "B077TVQC8J",
        ean: "",
        name: "",
        long_name:
          "SONGMICS Clothes Rack on Wheels, Heavy Duty Clothes Rail, with Extendable Hanging Rail, 90 kg Load Capacity, Easy Assembly, Portable, Silver HSR13S",
        short_name: "Clothes Rack",
        price: "41.99",
        price_sync_status: 0,
        discount: "0.00",
        discount_status: 0,
        cover: "https://m.media-amazon.com/images/I/31xg+UxKVHL._SL500_.jpg",
        stock: 0,
        whcode: "5101",
        availableStocks: 252,
        generalAvailableStocks: 0,
        brand: "SONGMICS",
        label: "",
        feature:
          "Enhanced Load Capacity: Thanks to the 1 mm thick steel tubes, which are thicker and sturdier than normal 0.8 mm thick ones, and the heavy-duty PP castors, this clothes rack supports up to 90 kg. So feel free to hang your heavy coats on![.]Extendable Hanging Rail: Each end of the top rail extends an additional 20 cm to give you more hanging space (the top rail extends from 92 cm to 132 cm); the 2 extension ends are also ideal for hanging your handbags, hats, scarves, or other accessories on[.]Easy to Move and Lock: This clothes rail comes with 4 360° swivel castors, 2 of which are lockable, allowing you to move it from your bedroom to your coatroom with ease and lock it in place if needed[.]Easy to Assemble and Store: No tools are needed to set up this clothing rail, and it can be ready in just 3 steps! When not in use, you can disassemble it and put it away under your bed or in an unused corner quickly to save space[.]Versatile Use: This clothes rail comes with 2 bottom bars for your storage boxes, making it functional whether in your bedroom or cloakroom to store daily items or in your laundry room to dry clothes. The chrome-plated steel also allows for outdoor use",
        content:
          "Specifications:<br/>- Colour: Silver<br/>- Material: Steel, PP Castors<br/>- Product Size: 45.4 x (92<br/>-132) x 160 cm (D x W x H)<br/>- Product Weight: 5 kg<br/>- Max. Static Load Capacity: 90 kg <br/><br/>Package Contents:<br/>- 1 x Clothes Rack<br/>- 1 x Instructions",
        amazon_url: "https://www.amazon.co.uk/dp/B077TVQC8J?tag=ong0c-21&linkCode=ogi&th=1&psc=1",
        sort: 995,
        seo_title: "",
        seo_keywords: "",
        seo_description: "",
        created_at: "2023-01-09 18:18:08",
        updated_at: "2023-03-13 11:21:18",
        status: 1,
        color: "Silver",
        customerScopeTypeName: "全量客户",
        bomInstructionFileUrl: "",
        productBrandCode: "",
        packageingLength1: "108.5",
        packageingLength2: "46.5",
        packageingLength3: "6.5",
        netWeight: "5000",
        roughWeight: "5700",
        volumeNumber: "32794.13",
        boxVolume: "1",
        productSize: "92—132x45.5x160cm",
        productMaterialEn: "Steel",
        features: [
          "Enhanced Load Capacity: Thanks to the 1 mm thick steel tubes, which are thicker and sturdier than normal 0.8 mm thick ones, and the heavy-duty PP castors, this clothes rack supports up to 90 kg. So feel free to hang your heavy coats on!",
          "Extendable Hanging Rail: Each end of the top rail extends an additional 20 cm to give you more hanging space (the top rail extends from 92 cm to 132 cm); the 2 extension ends are also ideal for hanging your handbags, hats, scarves, or other accessories on",
          "Easy to Move and Lock: This clothes rail comes with 4 360° swivel castors, 2 of which are lockable, allowing you to move it from your bedroom to your coatroom with ease and lock it in place if needed",
          "Easy to Assemble and Store: No tools are needed to set up this clothing rail, and it can be ready in just 3 steps! When not in use, you can disassemble it and put it away under your bed or in an unused corner quickly to save space",
          "Versatile Use: This clothes rail comes with 2 bottom bars for your storage boxes, making it functional whether in your bedroom or cloakroom to store daily items or in your laundry room to dry clothes. The chrome-plated steel also allows for outdoor use",
        ],
        images: [
          {
            id: 50042,
            product_id: 1842,
            image: "https://m.media-amazon.com/images/I/31xg+UxKVHL._SL500_.jpg",
            sort: 0,
            status: 1,
          },
          {
            id: 50043,
            product_id: 1842,
            image: "https://m.media-amazon.com/images/I/41xYPgaKGRL._SL500_.jpg",
            sort: 0,
            status: 1,
          },
          {
            id: 50044,
            product_id: 1842,
            image: "https://m.media-amazon.com/images/I/51DdY6xDK8L._SL500_.jpg",
            sort: 0,
            status: 1,
          },
          {
            id: 50045,
            product_id: 1842,
            image: "https://m.media-amazon.com/images/I/41uhtKAH9mL._SL500_.jpg",
            sort: 0,
            status: 1,
          },
          {
            id: 50046,
            product_id: 1842,
            image: "https://m.media-amazon.com/images/I/41-nOBkJmfL._SL500_.jpg",
            sort: 0,
            status: 1,
          },
          {
            id: 50047,
            product_id: 1842,
            image: "https://m.media-amazon.com/images/I/31EU3VO+noL._SL500_.jpg",
            sort: 0,
            status: 1,
          },
          {
            id: 50048,
            product_id: 1842,
            image: "https://m.media-amazon.com/images/I/41oQJBe4ajL._SL500_.jpg",
            sort: 0,
            status: 1,
          },
        ],
        restock: null,
        prices: [
          {
            section: "1~4",
            original_price: 0,
            price: "27.00",
          },
          {
            section: "5~49",
            original_price: 0,
            price: "23.14",
          },
          {
            section: "50+",
            original_price: 0,
            price: "21.60",
          },
        ],
        min_count: 1,
        prices_all: {
          default_sections: [
            {
              sku: "HSR13S",
              user_eyacode: "20000200",
              priceTypeCode: "Z002",
              priceTypeName: "不含税单价",
              customerTradeClauseCode: "EXW",
              customerTradeClauseName: "EXW",
              salesPrice: "27.00",
              marketingCode: "7040",
              numberFrom: 1,
              startTime: "2023-01-01 12:31:28",
              endTime: "2024-01-01 12:31:28",
              isEnabled: 1,
              created_at: "2023-01-20 09:42:39",
            },
            {
              sku: "HSR13S",
              user_eyacode: "20000200",
              priceTypeCode: "Z002",
              priceTypeName: "不含税单价",
              customerTradeClauseCode: "EXW",
              customerTradeClauseName: "EXW",
              salesPrice: "23.14",
              marketingCode: "7040",
              numberFrom: 5,
              startTime: "2023-01-01 12:31:28",
              endTime: "2024-01-01 12:31:28",
              isEnabled: 1,
              created_at: "2023-01-20 09:42:39",
            },
            {
              sku: "HSR13S",
              user_eyacode: "20000200",
              priceTypeCode: "Z002",
              priceTypeName: "不含税单价",
              customerTradeClauseCode: "EXW",
              customerTradeClauseName: "EXW",
              salesPrice: "21.60",
              marketingCode: "7040",
              numberFrom: 50,
              startTime: "2023-01-01 12:31:28",
              endTime: "2024-01-01 12:31:28",
              isEnabled: 1,
              created_at: "2023-01-20 09:42:39",
            },
          ],
          user_sections: [],
        },
        wished: 0,
      },
    };
  });
};
