package com.bgjm.domain.fields;

import java.io.Serializable;
import javax.persistence.*;

import com.bgjm.domain.NlEntity;


/**
 * Implementação dos campos da entidade JPA para a tabela PRODUTOS_PAROQUIA.<BR>
 *
 * Código gerado automaticamente!<BR>
 *
 * Gerado: 22/11/2023 15:57:37<BR>
 * Versão template: 1
 */
@MappedSuperclass
public abstract class ProdutosParoquiaFields implements Serializable, NlEntity {

	private static final long serialVersionUID = -3492300242101416744L;

	@Transient
	protected boolean novo = true;

						@Id
							@GeneratedValue(generator="ProdutosParoquiaSeq")
				@SequenceGenerator(name="ProdutosParoquiaSeq",sequenceName="PRODUTOS_SEQ", allocationSize=1)
											@Column(name="COD_PRODUTO",nullable=false)
					private Long codProduto;

									@Column(name="DES_PRODUTO",length=100,nullable=false)
					private String desProduto;

									@Column(name="VALOR_PRODUTO")
					private Long valorProduto;

									@Column(name="QUANTIDADE_TOTAL")
					private Long quantidadeTotal;


	public ProdutosParoquiaFields(){}

			/**
 *    <b>Coluna:</b> <i>COD_PRODUTO</i> <br>
 *      <b>Tipo:</b> <i>NUMBER(10,0)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public Long getCodProduto() {
			return this.codProduto;
		}
		/**
 *    <b>Coluna:</b> <i>COD_PRODUTO</i> <br>
 *      <b>Tipo:</b> <i>NUMBER(10,0)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public void setCodProduto(Long codProduto) {
			this.codProduto = codProduto;
		}
			/**
 *    <b>Coluna:</b> <i>DES_PRODUTO</i> <br>
 *      <b>Tipo:</b> <i>VARCHAR2(100)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public String getDesProduto() {
			return this.desProduto;
		}
		/**
 *    <b>Coluna:</b> <i>DES_PRODUTO</i> <br>
 *      <b>Tipo:</b> <i>VARCHAR2(100)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public void setDesProduto(String desProduto) {
			this.desProduto = desProduto;
		}
			/**
 *    <b>Coluna:</b> <i>VALOR_PRODUTO</i> <br>
 *      <b>Tipo:</b> <i>NUMBER(10,0)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public Long getValorProduto() {
			return this.valorProduto;
		}
		/**
 *    <b>Coluna:</b> <i>VALOR_PRODUTO</i> <br>
 *      <b>Tipo:</b> <i>NUMBER(10,0)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public void setValorProduto(Long valorProduto) {
			this.valorProduto = valorProduto;
		}
			/**
 *    <b>Coluna:</b> <i>QUANTIDADE_TOTAL</i> <br>
 *      <b>Tipo:</b> <i>NUMBER(10,0)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public Long getQuantidadeTotal() {
			return this.quantidadeTotal;
		}
		/**
 *    <b>Coluna:</b> <i>QUANTIDADE_TOTAL</i> <br>
 *      <b>Tipo:</b> <i>NUMBER(10,0)</i> <br>
 * <b>Descrição:</b> <i></i> <br>
 */
		public void setQuantidadeTotal(Long quantidadeTotal) {
			this.quantidadeTotal = quantidadeTotal;
		}

					    @Override
			public Long getPK() {
				return this.getCodProduto();
			}

			@Override
			public void setPK(Serializable pk) {
				this.setCodProduto((Long ) pk);
			}


	@Override
	public int hashCode() {
	    int hash = 1;
								hash = hash * 31 + (this.getCodProduto() == null ? 0 : this.getCodProduto().hashCode());
								hash = hash * 31 + (this.getDesProduto() == null ? 0 : this.getDesProduto().hashCode());
								hash = hash * 31 + (this.getValorProduto() == null ? 0 : this.getValorProduto().hashCode());
								hash = hash * 31 + (this.getQuantidadeTotal() == null ? 0 : this.getQuantidadeTotal().hashCode());
		    	return hash;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == this) {
			return true;
		} else if (obj instanceof ProdutosParoquiaFields) {
			Long pk1 = this.getPK();
			Long pk2 = ((ProdutosParoquiaFields) obj).getPK();
			if (pk1 == null) {
				return pk2 == null;
			}
			return pk1.equals(pk2);
		}
		return false;
	}

	@Override
	public String toString() {
		return "ProdutosParoquiaFields ["
							 +"codProduto="+codProduto					 +", desProduto="+desProduto					 +", valorProduto="+valorProduto					 +", quantidadeTotal="+quantidadeTotal				+ "]";
	}

	@Override
	@PostPersist
	@PostUpdate
	@PostLoad
	public void load() {
		this.novo = false;
	}

	@Override
	public boolean isNovo() {
		return this.novo;
	}

	@Override
	public void clearPK() {
		throw new java.lang.UnsupportedOperationException();
	}

	@Override
	public void clearSequence() {
									 this.setCodProduto(null);
																					}

}
