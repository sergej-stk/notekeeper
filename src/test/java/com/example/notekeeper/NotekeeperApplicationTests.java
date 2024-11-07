package com.example.notekeeper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

@SpringBootTest
class NotekeeperApplicationTests {

	@Test
	void testAddNote() {
		NoteController noteController = new NoteController(new NoteService());

		Note note = new Note();
		note.headline = "testHeadline";
		note.text = "testText";

		noteController.post(note); 

		ResponseEntity<Note> response = noteController.get(note.getId());

		Note body = response.getBody();
		assertEquals(200, response.getStatusCode().value());
		assertEquals("testHeadline", body.headline);
		assertEquals("testText", body.text);
	}
}
