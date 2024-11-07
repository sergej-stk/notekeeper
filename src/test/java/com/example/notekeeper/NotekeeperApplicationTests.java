package com.example.notekeeper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class NotekeeperApplicationTests {

	private NoteService noteService = new NoteService();

	@Test
	void testAddNote() {
		Note note = new Note();
		
		noteService.post(note);

		assertEquals(1, noteService.getAll().size());
	}

}
