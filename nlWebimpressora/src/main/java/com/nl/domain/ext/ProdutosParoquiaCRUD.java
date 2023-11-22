package com.nl.domain.ext;

import java.io.Serializable;
import javax.persistence.*;

import com.nl.domain.fields.ProdutosParoquiaFields;

/**
 * Implementação da entidade JPA para a tabela PRODUTOS_PAROQUIA.<BR>
 *
 * Código gerado automaticamente!<BR>
 *
 * Gerado: 22/11/2023 15:57:37<BR>
 * Versão template: 1
 */
@Entity
@Table(name="PRODUTOS_PAROQUIA")
public class ProdutosParoquiaCRUD extends ProdutosParoquiaFields implements Serializable {

	private static final long serialVersionUID = 7277945478006609552L;


	public ProdutosParoquiaCRUD(){}


	@Override
	public void clearPK() {
		novo = true;
					this.setCodProduto(null);
			}

}
