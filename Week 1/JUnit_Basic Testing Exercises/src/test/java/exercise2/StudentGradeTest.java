package exercise2;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class StudentGradeTest {
    @Test
    void testGradeInvalidBelow0() {
        Assertions.assertThrows(
            IllegalArgumentException.class,
            () -> StudentGrade.getGrade(-1)
        );
    }

    @Test
    void testGradeInvalidAbove100() {
        Assertions.assertThrows(
            IllegalArgumentException.class,
            () -> StudentGrade.getGrade(101)
        );
    }

    @Test
    void testGradeA() {
        Assertions.assertEquals("A", StudentGrade.getGrade(90));
    }

    @Test
    void testGradeB() {
        Assertions.assertEquals("B", StudentGrade.getGrade(89));
    }

    @Test
    void testGradeC() {
        Assertions.assertEquals("C", StudentGrade.getGrade(75));
    }

    @Test
    void testGradeD() {
        Assertions.assertEquals("D", StudentGrade.getGrade(60));
    }

    @Test
    void testGradeE() {
        Assertions.assertEquals("E", StudentGrade.getGrade(50));
    }
    @Test
    void testGradeF() {
        Assertions.assertEquals("F", StudentGrade.getGrade(33));
    }
}
