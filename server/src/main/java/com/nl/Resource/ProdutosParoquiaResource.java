package com.nl.Resource;

import com.nl.service.ProdutosParoquiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    public ResponseEntity printAll() throws Exception {
        this.produtosParoquiaService.printAll();
        return (ResponseEntity) ResponseEntity.ok();
    }

}
