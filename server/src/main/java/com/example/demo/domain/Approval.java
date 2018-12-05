package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Approval {
	private int id;
	private int docId;
	private int approver;
	private String approverName;
	private int stat;
	private String reason;
	private String ts;
}
