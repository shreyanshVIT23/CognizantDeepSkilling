SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS 
  v_updated_count NUMBER;
BEGIN
  UPDATE Accounts
    SET Balance = Balance * 1.01, LastModified = SYSDATE
    WHERE UPPER(AccountType) = 'SAVINGS';

  v_updated_count := SQL%ROWCOUNT;
  COMMIT;
  DBMS_OUTPUT.PUT_LINE('1% interest applied to: ' || v_updated_count || ' savings account(s).');
END;
/
