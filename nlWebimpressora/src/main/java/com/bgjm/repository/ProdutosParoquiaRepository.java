package com.bgjm.repository;

import com.bgjm.domain.ext.ProdutosParoquiaCRUD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutosParoquiaRepository extends JpaRepository<ProdutosParoquiaCRUD, Long> {
	//
}
