package com.example.demo.controller;

import static com.example.demo.controller.Util.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.DocDao;
import com.example.demo.domain.Doc;
import com.example.demo.service.DocService;

@CrossOrigin("*")
@RestController
@RequestMapping("/docs")
public class DocController {
	@Autowired
	private DocDao dao;
	
	@Autowired
	private DocService service;
	
	@GetMapping
	public Object findAll() {
		return response(dao.findAll());
	}
	
	@GetMapping("/{id}")
	public Object findByDoc(@PathVariable int id) {
		return response(dao.findOne(id));
	}
	
	@PostMapping("/u")
	public Object findByUpinfo(@RequestBody int deptId) {
		return response(dao.findByUpinfo(deptId));
	}	
	
	@PostMapping
	public Object insert(@RequestBody Doc doc) {
		response(dao.insert(doc));
		return doc.getId();
	}
	
	@PutMapping
	public Object update(@RequestBody Doc doc) {
		return response(dao.update(doc), HttpStatus.CONFLICT);
	}	
	
	@DeleteMapping("/{id}")
	public Object delete(@PathVariable int id) {
		return response(service.delete(id), HttpStatus.NOT_FOUND);
	}
}