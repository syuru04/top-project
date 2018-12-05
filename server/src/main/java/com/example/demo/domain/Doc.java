package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doc {
	private int id;
	private String title;
	private String body;
	private boolean publish;
	private int author;
	private String authorName;
	private String deptName;
	private String ts;
}
