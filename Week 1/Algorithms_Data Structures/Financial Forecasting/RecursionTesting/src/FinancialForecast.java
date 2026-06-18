import java.util.HashMap;
import java.util.Map;

public class FinancialForecast {
    private final Map<Integer, Double> monthlyForecast;
    private int recursion = 0, memo = 0;
    public FinancialForecast(Map<Integer, Double> monthlyForecast) {
        this.monthlyForecast = new HashMap<>(monthlyForecast);
    }
    public double recursiveForecast(int year) {
        if (monthlyForecast.containsKey(year)) {
            return monthlyForecast.get(year);
        }
        recursion++;
        double prevYear = recursiveForecast(year - 1);
        double twoPrevYear = recursiveForecast(year - 2);
        double growthRate = (prevYear - twoPrevYear)/ twoPrevYear;
        return prevYear * (1+growthRate);
    }
    public double optimizedForecast(int year) {
        if (monthlyForecast.containsKey(year)) {
            return monthlyForecast.get(year);
        }
        memo++;
        double prevYear = optimizedForecast(year - 1);
        double twoPrevYear = optimizedForecast(year - 2);

        double growthRate = (prevYear - twoPrevYear)/ twoPrevYear;
        double forecast = prevYear * (1+growthRate);

        monthlyForecast.put(year, forecast);
        return forecast;
    }

    public int getRecursion() {
        return recursion;
    }
    public int getMemo() {
        return memo;
    }
}
