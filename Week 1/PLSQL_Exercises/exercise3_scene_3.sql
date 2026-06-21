SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE TransferFunds (
    p_SourceAccountID      IN NUMBER,
    p_DestinationAccountID IN NUMBER,
    p_Amount               IN NUMBER
) IS
    v_SourceBalance NUMBER;
    v_DestExists    NUMBER;
BEGIN
    IF p_Amount <=0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Transfer amount must be greater than zero.');
    END IF;

    IF p_SourceAccountID = p_DestinationAccountID THEN
        RAISE_APPLICATION_ERROR(-20002, 'Source and destination accounts cannot be the same.');
    END IF;

    SELECT COUNT(*) INTO v_DestExists
    FROM Accounts
    WHERE AccountID = p_DestinationAccountID;
    
    IF v_DestExists = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'Destination account does not exist.');
    END IF;

    SELECT Balance INTO v_SourceBalance
    FROM Accounts
    WHERE AccountID = p_SourceAccountID
    FOR UPDATE; 

    IF v_SourceBalance < p_Amount THEN
        RAISE_APPLICATION_ERROR(-20004, 'Insufficient funds in the source account.');
    END IF;

    UPDATE Accounts
    SET Balance = Balance - p_Amount,
        LastModified = SYSDATE
    WHERE AccountID = p_SourceAccountID;

    UPDATE Accounts
    SET Balance = Balance + p_Amount,
        LastModified = SYSDATE
    WHERE AccountID = p_DestinationAccountID;

    -- Log the Debit
    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES ((SELECT NVL(MAX(TransactionID), 0) + 1 FROM Transactions), 
            p_SourceAccountID, SYSDATE, p_Amount, 'DEBIT');
    -- Log the Credit
    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES ((SELECT NVL(MAX(TransactionID), 0) + 1 FROM Transactions), 
            p_DestinationAccountID, SYSDATE, p_Amount, 'CREDIT');

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Successfully transferred $' || p_Amount || ' from Account ' || p_SourceAccountID || ' to Account ' || p_DestinationAccountID);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error: Source account does not exist.');
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Transaction failed: ' || SQLERRM);
END TransferFunds;
/
