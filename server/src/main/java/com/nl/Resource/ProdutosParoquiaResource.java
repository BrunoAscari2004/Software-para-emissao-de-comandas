package com.nl.Resource;

import com.nl.domain.Product;
import com.nl.service.ProdutosParoquiaService;
import com.nl.repository.ProdutosParoquiaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/v1/produtosParoquia")
public class ProdutosParoquiaResource {

    private final ProdutosParoquiaService produtosParoquiaService;

    public ProdutosParoquiaResource(final ProdutosParoquiaService produtosParoquiaService) {
        this.produtosParoquiaService = produtosParoquiaService;
    }

	@GetMapping
	public ResponseEntity<Collection<Product>> findAll() {
		return ResponseEntity.ok(this.produtosParoquiaService.findAll());
	}

    @DeleteMapping("/{codId}")
    public ResponseEntity<String> delete(@PathVariable ("codId") final Long codId) throws IOException {
        produtosParoquiaService.remove(codId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

	@PostMapping
	public ResponseEntity<Product> save (@RequestBody final Product product ) throws IOException {
		return ResponseEntity.ok(this.produtosParoquiaService.save(product));
	}

    public ResponseEntity printAll() throws Exception {
        this.produtosParoquiaService.printAll();
        return (ResponseEntity) ResponseEntity.ok();
    }

}
