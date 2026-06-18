public class ExcelDocumentFactory extends DocumentFactory {
    @Override
    public Document createDocument() {
        return new Microsoft2007ExcelDocument();
    }
}
