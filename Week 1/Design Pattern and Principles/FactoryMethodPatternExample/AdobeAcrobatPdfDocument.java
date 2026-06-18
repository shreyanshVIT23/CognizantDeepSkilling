public class AdobeAcrobatPdfDocument implements PdfDocument{

    @Override
    public void view() {
        System.out.println("Viewing pdf file in Adobe Acrobat");
    }

    @Override
    public void open() {
        System.out.println("Opening PDF file in Adobe Acrobat");
    }

    @Override
    public void close() {
        System.out.println("Closing PDF file in Adobe Acrobat");
    }
}
