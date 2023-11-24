package com.nl.service;


import com.nl.Printer.PrintingMain;
import com.nl.domain.Product;
import com.nl.repository.ProdutosParoquiaRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collection;

@Service
public class ProdutosParoquiaService {

    private final ProdutosParoquiaRepository produtosParoquiaRepository;

    public ProdutosParoquiaService(final ProdutosParoquiaRepository produtosParoquiaRepository) {
        this.produtosParoquiaRepository = produtosParoquiaRepository;
    }

	public Collection<Product> findAll(){
		return this.produtosParoquiaRepository.findAll();
	}

    public void remove (final Long codId) throws IOException {
        this.produtosParoquiaRepository.remove(codId);
    }

    public Product save (final Product product) throws IOException{
        return this.produtosParoquiaRepository.save(product);
    }

    public void printAll() throws Exception {
        PrintingMain.printAll();

    }

}
