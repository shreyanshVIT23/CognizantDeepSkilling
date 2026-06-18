public class Microsoft2007WordDocument implements WordDocument{
    @Override
    public void open() {
        System.out.println("Opening Microsoft2007WordDocument");
    }

    @Override
    public void close() {
        System.out.println("Closing Microsoft2007WordDocument");
    }

    @Override
    public void edit() {
        System.out.println("Editing Microsoft2007WordDocument");
    }
}
