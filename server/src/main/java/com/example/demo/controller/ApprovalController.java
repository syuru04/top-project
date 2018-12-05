package com.example.demo.controller;

import static com.example.demo.controller.Util.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.ApprovalDao;
import com.example.demo.domain.Approval;

@CrossOrigin("*")
@RestController
@RequestMapping("/appr")
public class ApprovalController {

	@Autowired
	private ApprovalDao dao;
	
	@GetMapping
	public Object findAll() {
		return response(dao.findAll());
	}
	
	@PostMapping
	public Object insert(@RequestBody Approval approval) {
		return response(dao.insert(approval), HttpStatus.FOUND);
	}
	
	@PostMapping("/a")
	public Object approverList(@RequestBody int docId) {
		return response(dao.approverList(docId));
	}
	
	@PutMapping
	public Object update(@RequestBody Approval approval) {
		return response(dao.update(approval), HttpStatus.CONFLICT);
	}	
}
