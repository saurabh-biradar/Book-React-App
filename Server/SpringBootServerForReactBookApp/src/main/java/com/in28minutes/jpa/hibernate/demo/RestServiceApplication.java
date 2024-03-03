package com.in28minutes.jpa.hibernate.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.in28minutes.jpa.hibernate.demo.dao.DaoApp;
import com.in28minutes.jpa.hibernate.demo.entity.Book;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RestServiceApplication {
	
	@Autowired
	DaoApp daoApp;
	
	@GetMapping("/")
	public String greetMsg() {
		return "Welcome!";
	}
	
	@GetMapping("/books")
	public List<Book> getAllBooks(){
		return daoApp.getAllBooks();
	}
	
	
	@PostMapping("/books")
	public void createBook(@RequestBody Book book) {
		daoApp.addBook(book);
	}
	
	@DeleteMapping("/book/{id}")
	public void removeBookById(@PathVariable int id) {
		daoApp.deleteBook(id);
	}
	
	@PutMapping("/book/{id}")
	public void updateBookById(@PathVariable int id, @RequestBody Book book) {
		daoApp.updateBook(id, book);
	}
}
