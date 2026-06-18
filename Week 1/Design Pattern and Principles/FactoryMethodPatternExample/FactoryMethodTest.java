public class FactoryMethodTest {
    public static void main(String[] args) {

        // Creating different factory methods
        DocumentFactory wordFactory = new WordDocumentFactory();
        DocumentFactory pdfFactory = new PdfDocumentFactory();
        DocumentFactory excelFactory = new ExcelDocumentFactory();

        // Demonstrating createDocument method to return different types of document with no need to view internal
        // code loosely coupled
        WordDocument wordDocument = (WordDocument) wordFactory.createDocument();
        PdfDocument pdfDocument = (PdfDocument) pdfFactory.createDocument();
        ExcelDocument excelDocument = (ExcelDocument) excelFactory.createDocument();

        // Open method in all documents
        wordDocument.open();
        pdfDocument.open();
        excelDocument.open();

        // Unique method of each class
        wordDocument.edit();
        pdfDocument.view();
        excelDocument.calc();

        // Close method common in all documents
        wordDocument.close();
        pdfDocument.close();
        excelDocument.close();
    }
}
