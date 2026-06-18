public class ProductSearchTest {
    public static void main(String[] args) {
        Product[] products = new Product[200];
        products[199] = new Product(200, "A", "12345");

        // Create a mock product list
        for (int i = 0; i < products.length-1; i++) {
            products[i] = new Product(i + 1, String.valueOf((int) 'a' + i), String.valueOf(Math.random()));
        }

        SearchingAlgorithm sa = new LinearProductSearch(products);
        sa.search(products[199]);
        sa = new BinaryProductSearch(products);
        sa.search(products[199]);
    }
}
