package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectKey;

import com.example.demo.domain.Doc;
import com.example.demo.domain.DocAppr;

@Mapper
public interface DocDao {

	public List<Doc> findAll();
	
	public DocAppr findByUpinfo(int deptId);
	
	@Insert("insert into doc(title ,body , author ,ts) values(#{title}, #{body}, #{author}, #{ts})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Doc doc);
	
	public Doc findOne(int id);
	
	public List<Doc> find(@Param("skip") int skip, @Param("count") int count);
			
	public int update(Doc doc);
	
	@Delete("delete from doc where id=#{id}")
	public int delete(int id);
	
	@Delete("delete from approval where doc_id=#{id}")
	public int deleteAppr(int id);
	
	public List<Doc> myDoc(int author);

	public List<Doc> aprvDoc(@Param("approver") int approver, @Param("stat") int stat);

}
