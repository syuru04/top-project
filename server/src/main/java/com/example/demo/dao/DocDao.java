package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectKey;

import com.example.demo.domain.Doc;
import com.example.demo.domain.DocAppr;

@Mapper
public interface DocDao {

	public List<Doc> findAll();
	
	public DocAppr findByUpinfo(int deptId);
	
	@Insert("insert into doc(title ,body ,publish ,author ,ts) values(#{title}, #{body}, #{publish}, #{author}, #{ts})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Doc doc);
	
	public Doc findOne(int id);
			
	public int update(Doc doc);

}
