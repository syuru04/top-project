package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doc {
	private int id;
	private int docId;
	private String title;
	private int author;
	private String authorName;
	private String deptId;
	private String deptName;
	private int stat;
	private String body;
	private String ts;
}
