public abstract class SearchingAlgorithm {
    protected Product[] products;
    SearchingAlgorithm(Product[] products) {
        this.products = products;
    }

    abstract boolean search(Product product);
}
