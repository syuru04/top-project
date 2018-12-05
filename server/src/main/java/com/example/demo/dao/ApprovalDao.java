package com.example.demo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectKey;

import com.example.demo.domain.Approval;
import com.example.demo.domain.DocApprDetail;

@Mapper
public interface ApprovalDao {
	
	public List<Approval> findAll();
	
	@Insert("insert into approval(doc_id, approver, ts) values (#{docId}, #{approver}, #{ts})")
	@SelectKey(statement="select LAST_INSERT_ID()", before=false, keyProperty="id", resultType=Integer.class)
	public int insert(Approval approval);
	
	public List<DocApprDetail> approverList(int docId);
	
	public int update(Approval approval);
}
