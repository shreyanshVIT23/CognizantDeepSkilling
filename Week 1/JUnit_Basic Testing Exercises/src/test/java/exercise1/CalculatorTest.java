package exercise1;
import org.junit.Assert;
import org.junit.Test;

public class CalculatorTest {
    @Test
    public void testAdd() {
        Assert.assertEquals(2, Calculator.add(1, 1));
        System.out.println("Passed the test");
    }
}
