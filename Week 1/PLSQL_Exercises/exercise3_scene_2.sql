SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
  p_department IN Employees.Department%TYPE,
  p_bonusPercentage IN NUMBER
) IS 
  v_updated_count NUMBER;
BEGIN
  UPDATE Employees 
  SET Salary = Salary + (Salary * (p_bonusPercentage / 100))
  WHERE UPPER(Department) = UPPER(p_department);
  v_updated_count := SQL%ROWCOUNT;
  COMMIT;
  IF v_updated_count > 0 THEN 
    DBMS_OUTPUT.PUT_LINE(
      'Applied a ' || p_bonusPercentage || '% bonus to ' || v_updated_count || ' employee(s) in the ' ||
      p_department || ' department.'
    );
  ELSE  
    DBMS_OUTPUT.PUT_LINE(
      'No employee found in the ' || p_department || ' department. No changes made.'
    );
  END IF;
END;
/ 
