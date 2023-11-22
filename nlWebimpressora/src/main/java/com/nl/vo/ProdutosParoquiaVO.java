package com.nl.vo;

import java.io.Serializable;

public class ProdutosParoquiaVO implements Serializable{

	private Long codProduto;

	private String desProduto;

	private Long valorProduto;

	private Long quantidadeTotal;

	public Long getCodProduto() {
		return codProduto;
	}

	public void setCodProduto(Long codProduto) {
		this.codProduto = codProduto;
	}

	public String getDesProduto() {
		return desProduto;
	}

	public void setDesProduto(String desProduto) {
		this.desProduto = desProduto;
	}

	public Long getValorProduto() {
		return valorProduto;
	}

	public void setValorProduto(Long valorProduto) {
		this.valorProduto = valorProduto;
	}

	public Long getQuantidadeTotal() {
		return quantidadeTotal;
	}

	public void setQuantidadeTotal(Long quantidadeTotal) {
		this.quantidadeTotal = quantidadeTotal;
	}



}

