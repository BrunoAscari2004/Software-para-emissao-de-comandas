package com.bgjm.web.rest;

import com.bgjm.domain.ext.ProdutosParoquiaCRUD;
import com.bgjm.service.ProdutosParoquiaService;
import com.bgjm.vo.ProdutosParoquiaVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/produtosParoquia")
public class ProdutosParoquiaResource {

	private final ProdutosParoquiaService produtosParoquiaService;

	public ProdutosParoquiaResource(final ProdutosParoquiaService produtosParoquiaService) {
		this.produtosParoquiaService = produtosParoquiaService;
	}

	@GetMapping
	public ResponseEntity<List<ProdutosParoquiaCRUD>> findAll() {
		return ResponseEntity.ok(this.produtosParoquiaService.findAll());
	}

	@GetMapping("/{codProduto}")
	public ResponseEntity<ProdutosParoquiaCRUD> findOne(@PathVariable final Long codProduto) {
		Optional<ProdutosParoquiaCRUD> entity = this.produtosParoquiaService.findOne(codProduto);
		return entity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
	}

	@PostMapping
	public ResponseEntity<ProdutosParoquiaCRUD> save (@RequestBody final ProdutosParoquiaVO vo ) {
		return ResponseEntity.ok(this.produtosParoquiaService.save(vo));
	}

	@DeleteMapping("/{codProduto}")
	public ResponseEntity<Void> deleteById (@PathVariable final Long codProduto){
		this.produtosParoquiaService.deleteById(codProduto);
		return ResponseEntity.noContent().build();
	}
}
