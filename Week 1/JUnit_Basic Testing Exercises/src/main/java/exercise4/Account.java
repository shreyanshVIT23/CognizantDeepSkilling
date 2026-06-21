package exercise4;

public class Account {
    private double balance;
    public Account(double balance) {
        this.balance = balance;
    }
    public double getBalance() {
        return balance;
    }
    public void withdraw(double balance) {
        if (this.balance >= balance) {
            this.balance -= balance;
            return;
        }
        throw new IllegalArgumentException("Amount to withdraw is greater than balance");
    }
    public void deposit(double balance) {
        this.balance += balance;
    }
}
