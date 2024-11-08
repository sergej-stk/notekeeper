package com.example.notekeeper;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import com.example.notekeeper.requests.PostRequestBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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

		PostRequestBody note = new PostRequestBody();
		note.headline = "testHeadline";
		note.text = "testText";

		ResponseEntity<Note> postResponse = noteController.post(note, new HttpServletRequest(), new HttpServletResponse()); 

		assertEquals(0, postResponse.getBody().getId());
		System.out.println("note id = 0 -> check");

		PostRequestBody note2 = new PostRequestBody();
		note2.headline = "testHeadline";
		note2.text = "testText";

		ResponseEntity<Note> postResponse2 = noteController.post(note2); 

		assertEquals(1, postResponse2.getBody().getId());
		System.out.println("note2 id = 1 -> check");

		ResponseEntity<Note> response = noteController.getOne(postResponse.getBody().getId());

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

		PostRequestBody note = new PostRequestBody();
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

		PostRequestBody note = new PostRequestBody();
		note.headline = "testHeadline";
		note.text = "testText";

		ResponseEntity<Note> postResponse = noteController.post(note); 

		ResponseEntity<?> response = noteController.delete(postResponse.getBody().getId());

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
