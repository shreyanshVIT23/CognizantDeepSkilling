package exercise2;

public class StudentGrade {
    public static String getGrade(int marks) throws IllegalArgumentException{
        if  (marks < 0 || marks > 100) {
            throw new IllegalArgumentException("marks must be between 0 and 100");
        } else if  (marks >= 90) {
            return "A";
        } else if  (marks >= 80) {
            return "B";
        }  else if  (marks >= 70) {
            return "C";
        } else if  (marks >= 60) {
            return "D";
        } else if  (marks >= 50) {
            return "E";
        }
        return "F";
    }
}
