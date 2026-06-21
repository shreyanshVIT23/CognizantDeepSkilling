ALTER TABLE CUSTOMERS
   ADD IsVIP VARCHAR2(5) DEFAULT 'FALSE';

SET SERVEROUTPUT ON;

DECLARE
  CURSOR vip_customer IS 
    SELECT CustomerID FROM Customers 
    WHERE Balance > 10000;
BEGIN
  FOR r_cust IN vip_customer LOOP
    UPDATE Customers
      SET IsVIP = 'TRUE'
      WHERE r_cust.CustomerID = CustomerID;
  DBMS_OUTPUT.PUT_LINE('Customer id: ' || r_cust.CustomerID || ' is a VIP');
  END LOOP;
  
  COMMIT;
  

END;
/ 
