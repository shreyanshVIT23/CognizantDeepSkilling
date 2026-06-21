package exercise4;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class AccountTest {
    private Account account;
    private static final double DELTA = 0.00001;
    private static final double INITIAL_AMOUNT = 5000;
    @Before
    public void setUp() {
        System.out.println("Creating a mock bank account.");
        account = new Account(INITIAL_AMOUNT);
    }

    @After
    public void tearDown() {
        System.out.println("Clearing all accounts.");
        account = null;
    }

    @Test
    public void testDeposit() {
        // Arrange
        double depositAmount = 300;

        // Act
        account.deposit(depositAmount);

        // Assert
        Assert.assertEquals(INITIAL_AMOUNT+depositAmount, account.getBalance(), DELTA);
    }

    @Test
    public void testWithdrawValid() {
        // Arrange
        double withdrawAmount = 300;

        // Act
        account.withdraw(withdrawAmount);

        // Assert
        Assert.assertEquals(INITIAL_AMOUNT-withdrawAmount, account.getBalance(), DELTA);
    }

    @Test
    public void testWithdrawInvalid() {
        // Arrange
        double withdrawAmount = 30000;

        // Assert
        Assert.assertThrows(
            IllegalArgumentException.class,
            // Act
            () -> account.withdraw(withdrawAmount)
        );
    }
}
