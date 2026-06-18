public class Logger {

    // Private logger object shared between every logger class created as it is static in nature
    private static Logger logger;

    // Private constructor so that new Logger() throws error
    private Logger() {
        System.out.println("Logger initialized");
    }

    // Synchronized and returns the same logger every time as the logger object is static
    public static synchronized Logger getInstance() {
        if (logger == null) {
            logger = new Logger();
        }
        return logger;
    }

    // Method for a logger method
    public void log(String message) {
        System.out.println("[LOG]" + message);
    }
}
