package com.bgjm.service;

import com.bgjm.repository.ProdutosParoquiaRepository;
import com.bgjm.vo.ProdutosParoquiaVO;
import com.bgjm.domain.ext.ProdutosParoquiaCRUD;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutosParoquiaService {
	private final ProdutosParoquiaRepository produtosParoquiaRepository;
	public ProdutosParoquiaService(final ProdutosParoquiaRepository produtosParoquiaRepository){
		this.produtosParoquiaRepository = produtosParoquiaRepository;
	}

	public List<ProdutosParoquiaCRUD> findAll(){
		return this.produtosParoquiaRepository.findAll();
	}

	public Optional<ProdutosParoquiaCRUD> findOne(final Long codProduto) {
		return this.produtosParoquiaRepository.findById(codProduto);
	}
	public ProdutosParoquiaCRUD save (final ProdutosParoquiaVO vo){
		return this.produtosParoquiaRepository.save(this.toEntity(vo));
	}

	public void deleteById(final Long codProduto) {
		this.produtosParoquiaRepository.deleteById(codProduto);
	}

	private ProdutosParoquiaCRUD toEntity (final ProdutosParoquiaVO vo) {
		ProdutosParoquiaCRUD entity = new ProdutosParoquiaCRUD();
		entity.setCodProduto(vo.getCodProduto());
		entity.setDesProduto(vo.getDesProduto());
		entity.setValorProduto(vo.getValorProduto());
		entity.setQuantidadeTotal(vo.getQuantidadeTotal());
		return entity;
	}
}
