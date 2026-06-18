public class LinearProductSearch extends SearchingAlgorithm {
    public LinearProductSearch(Product[] products) {
        super(products);
    }

    @Override
    public boolean search(Product product) {
        int counter = 0;
        for (var p : products) {
            if  (p.getId() == product.getId()) {
                System.out.println("Linear Search found product " + p.getName() + " in " + counter + " steps.");
                return true;
            }
            counter++;
        }
        return false;
    }
}
