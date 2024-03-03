package com.in28minutes.jpa.hibernate.demo.dao;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.in28minutes.jpa.hibernate.demo.entity.Book;
import com.in28minutes.jpa.hibernate.demo.repository.BookJpaRepo;

@Service
public class DaoApp {
	@Autowired
	BookJpaRepo bookRepository;
	
	public DaoApp() {
		System.out.println("0 arg constructor of DaoApp called....");
	}
	
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	public void addBook(Book book) {
		bookRepository.save(book);
	}
	
	public void deleteBook(int id) {
		bookRepository.deleteById(id);
	}
	
	public void updateBook(int id, Book book) {
		Optional<Book> existingBookOptional = bookRepository.findById(id);
		if(existingBookOptional.isPresent()) {
			Book existingBook = existingBookOptional.get();
			existingBook.setName(book.getName());
			existingBook.setPrice(book.getPrice());
			bookRepository.save(existingBook);
		}
		else {
			System.out.println("Book not found!");
		}
	}
	
}
