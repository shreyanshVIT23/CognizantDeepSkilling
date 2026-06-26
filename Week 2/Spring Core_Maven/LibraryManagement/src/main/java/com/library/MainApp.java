package com.library;

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainApp {
    public static void main(String[] args) {
        ApplicationContext  context = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookService bookService1 = (BookService) context.getBean("bookService");
        bookService1.displayService();
        BookService bookService2 = (BookService) context.getBean("bookService");
        if (bookService1 == bookService2) {
            System.out.println("Book Service is the same");
        }
    }
}
