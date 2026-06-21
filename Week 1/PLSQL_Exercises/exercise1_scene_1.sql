SET SERVEROUTPUT ON;

BEGIN
  FOR cust IN (
    SELECT CustomerID, FLOOR(MONTHS_BETWEEN(SYSDATE, DOB)/ 12) AS Age FROM Customers
  )
  LOOP 
    IF cust.Age > 60 THEN 
      UPDATE LOANS
      SET InterestRate = InterestRate - 1
      WHERE CustomerID = cust.CustomerID;
      
      DBMS_OUTPUT.PUT_LINE(
        '1% discount applied to the customer' || cust.CustomerID
      );
    END IF;
  END LOOP;
  COMMIT;
END;
/ 

