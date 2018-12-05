package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.DocDao;

@Service
public class DocService {
	@Autowired
	DocDao dao;
	
	public int delete(int id) {
		dao.deleteAppr(id);
		return dao.delete(id);
	}
}