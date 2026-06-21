SET SERVEROUTPUT ON;

DECLARE
  CURSOR c_due_loans IS 
    SELECT c.CustomerID, c.Name, l.LoanID, l.LoanAmount, l.EndDate
    FROM Customers c 
    JOIN Loans l 
    ON c.CustomerID = l.CustomerID
    WHERE l.EndDate BETWEEN TRUNC(SYSDATE) AND TRUNC(SYSDATE + 30);
  v_count NUMBER := 0;
BEGIN
  FOR r_loan IN c_due_loans LOOP 
    DBMS_OUTPUT.PUT_LINE(
      'Reminder: Customer ' || r_loan.CustomerID || ', your Loan (ID: ' || r_loan.LoanID ||
      ') for amount of $' || r_loan.LoanAmount || ' is due on ' || TO_CHAR(r_loan.EndDate, 'YYYY-MM-DD')
    );
  v_count := v_count + 1;
  END LOOP;

  IF v_count = 0 THEN 
    DBMS_OUTPUT.PUT_LINE('No loans are due within the next 30 days.');
  ELSE 
    DBMS_OUTPUT.PUT_LINE('Total Reminder generated ' || v_count);
  END IF;
END;
/ 
