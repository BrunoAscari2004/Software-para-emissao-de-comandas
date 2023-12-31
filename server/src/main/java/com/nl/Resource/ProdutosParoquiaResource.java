package com.nl.Resource;

import com.nl.Service.ProdutosParoquiaService;
import com.nl.domain.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/produtosParoquia")
public class ProdutosParoquiaResource {

	private final ProdutosParoquiaService produtosParoquiaService;

	public ProdutosParoquiaResource(final ProdutosParoquiaService produtosParoquiaService) {
		this.produtosParoquiaService = produtosParoquiaService;
	}
/*
	@GetMapping
	public ResponseEntity<List<Product>> findAll() {
		return ResponseEntity.ok(this.produtosParoquiaService.findAll());
	}

	@GetMapping("/{codProduto}")
	public ResponseEntity<Product> findOne(@PathVariable final Long codProduto) {
		Optional<Product> entity = this.produtosParoquiaService.findOne(codProduto);
		return entity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
	}

	@PostMapping
	public ResponseEntity<Product> save (@RequestBody final Product product ) {
		return ResponseEntity.ok(this.produtosParoquiaService.save(product));
	}

	@DeleteMapping("/{codProduto}")
	public ResponseEntity<Void> deleteById (@PathVariable final Long codProduto){
		this.produtosParoquiaService.deleteById(codProduto);
		return ResponseEntity.noContent().build();
	}*/


    @GetMapping
    public ResponseEntity<Void> printAll(@RequestBody final List<Product> productList) throws Exception {
        this.produtosParoquiaService.printAll(productList);
        return ResponseEntity.ok().build();
    }

}

