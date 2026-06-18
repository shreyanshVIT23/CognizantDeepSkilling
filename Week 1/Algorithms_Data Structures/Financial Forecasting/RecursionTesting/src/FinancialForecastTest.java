import java.util.HashMap;
import java.util.Map;

public class FinancialForecastTest {
    public static void main(String[] args) {
        // Last 2 year historical data
        Map<Integer, Double> monthlyForecast = new HashMap<>();

        // Create mock data with 8% growth rate
        monthlyForecast.put(0, 10000.0);
        monthlyForecast.put(1, 10800.0);

        FinancialForecast obj = new FinancialForecast(monthlyForecast);
        obj.recursiveForecast(20);
        System.out.println(obj.getRecursion() + ": Number of times the function recursed over itself");

        obj.optimizedForecast(20);
        System.out.println(obj.getMemo() + ": Number of times the optimized function recursed over itself");
    }
}
