package com.nl.Service;


import com.nl.Printer.PrintingMain;
import com.nl.domain.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutosParoquiaService {
    /*
	private final ProdutosParoquiaRepository produtosParoquiaRepository;
	public ProdutosParoquiaService(final ProdutosParoquiaRepository produtosParoquiaRepository){
		this.produtosParoquiaRepository = produtosParoquiaRepository;
	}

	public List<Product> findAll(){
		return this.produtosParoquiaRepository.findAll();
	}

	public Optional<Product> findOne(final Long codProduto) {
		return this.produtosParoquiaRepository.findById(codProduto);
	}
	public Product save (final Product product){
		return this.produtosParoquiaRepository.save(this.toEntity(product));
	}

    //2 saves





	public void deleteById(final Long codProduto) {
		this.produtosParoquiaRepository.deleteById(codProduto);
	}

	private Product toEntity (final ProdutosParoquiaVO vo) {
		Product entity = new Product();
		entity.getId(vo.getCodProduto());
		entity.getNome(vo.getDesProduto());
		entity.getPreco(vo.getValorProduto());
		entity.getQuantidade(vo.getQuantidadeTotal());
		return entity;
	}

	final List<Product> productsToPrint
	*/

	 public void printAll( final List<Product> productList) throws Exception {
        PrintingMain.printAll(productList);

     }

}

