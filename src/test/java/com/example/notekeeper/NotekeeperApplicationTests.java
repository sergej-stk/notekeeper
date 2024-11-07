package com.example.notekeeper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import java.util.List;

@SpringBootTest
class NotekeeperApplicationTests {

	/**
	 * Test
	 * - post
	 * - getOne
	 */
	@Test
	void testAddNoteAndGetNote() {
		System.out.println("Test = testAddNoteAndGetNote");
		NoteController noteController = new NoteController(new NoteService());

		Note note = new Note();
		note.headline = "testHeadline";
		note.text = "testText";

		ResponseEntity<Note> postResponse = noteController.post(note); 

		assertEquals(0, postResponse.getBody().getId());
		System.out.println("note id = 0 -> check");

		ResponseEntity<Note> response = noteController.getOne(note.getId());

		Note body = response.getBody();
		assertEquals(201, postResponse.getStatusCode().value());
		System.out.println("post status code -> check");

		assertEquals(200, response.getStatusCode().value());
		System.out.println("getOne status code -> check");

		assertEquals("testHeadline", body.headline);
		assertEquals("testText", body.text);
		System.out.println("test body data -> check");
	}

	/**
	 * Test
	 * - getOne //Not existing
	 */
	@Test
	void testLoadNotExisting() {
		System.out.println("Test = testLoadNotExisting");
		NoteController noteController = new NoteController(new NoteService());
		
		ResponseEntity<Note> response = noteController.getOne(0);
		assertEquals(404, response.getStatusCode().value());
	}

	/**
	 * Test
	 * - getAll
	 */
	@Test 
	void testGetAll() {
		System.out.println("Test = testGetAll");
		NoteController noteController = new NoteController(new NoteService());

		Note note = new Note();
		note.headline = "testHeadline";
		note.text = "testText";

		noteController.post(note); 

		ResponseEntity<List<Note>> response = noteController.getAll();

		assertEquals(1, response.getBody().size());
	}

	/**
	 * Test
	 * - delete
	 */
	@Test 
	void testDelete() {
		System.out.println("Test = testDelete");
		NoteController noteController = new NoteController(new NoteService());

		Note note = new Note();
		note.headline = "testHeadline";
		note.text = "testText";

		noteController.post(note); 

		ResponseEntity<?> response = noteController.delete(note.getId());

		assertEquals(200, response.getStatusCode().value());
	}

	/**
	 * Test
	 * - delete //Not existing
	 */
	@Test 
	void testDeleteNotExisting() {
		System.out.println("Test = testDeleteNotExisting");
		NoteController noteController = new NoteController(new NoteService());

		ResponseEntity<?> response = noteController.delete(1);

		assertEquals(404, response.getStatusCode().value());
	}

}
