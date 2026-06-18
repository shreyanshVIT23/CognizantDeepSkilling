// Test Class

public class SingletonTest {
    public static void main(String[] args) {
        // Create logger1
        Logger logger1 = Logger.getInstance();
        logger1.log("Logging Started");

        // Test
        System.out.println("Test to check if two instance of Logger.getLogger() are same:");

        // Logger 2
        Logger logger2 = Logger.getInstance();
        if  (logger1 == logger2) {
            System.out.println("Logger1 and Logger2 is the same");
        } else {
            // Will never reach as Logger is a Singleton class
            System.out.println("Logger1 and Logger2 is not the same");
        }
    }
}
