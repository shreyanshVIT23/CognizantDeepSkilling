public class Microsoft2007ExcelDocument implements ExcelDocument {
    @Override
    public void calc() {
        System.out.println("Calculating some values in Excel");
    }

    @Override
    public void open() {
        System.out.println("Opening Microsoft2007ExcelDocument");

    }

    @Override
    public void close() {
        System.out.println("Closing Microsoft2007ExcelDocument");
    }
}
