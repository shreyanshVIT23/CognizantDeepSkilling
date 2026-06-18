public class BinaryProductSearch extends SearchingAlgorithm {

    public BinaryProductSearch(Product[] products) {
        super(products);
    }

    @Override
    public boolean search(Product product) {
        int left = 0;
        int right = products.length - 1;
        int counter = 0;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int currentId = products[mid].getId();
            if (currentId == product.getId()) {
                System.out.println("Binary Search found product " + product.getName() + " in " + counter + " steps.");
                return true;
            }
            else if (currentId < product.getId()) {
                left = mid + 1;
            } else  {
                right = mid - 1;
            }
            counter++;
        }
        return false;
    }
}
