package com.nl.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.nl.repository.props.ProdutosParoquiaProps;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class ProdutosParoquiaRepository implements Serializable {

    private static final long serialVersionUID = 1405158254422484545L;
    private static final Logger logger = LoggerFactory.getLogger(ProdutosParoquiaRepository.class);

    private final ProdutosParoquiaProps props;
    private final ObjectMapper mapper;

    private Path storage;

    private Map<Long, ProdutosParoquia> data;

    public ProdutosParoquiaRepository(final ProdutosParoquiaProps props,
                                      final ObjectMapper mapper) {
        super();
        this.props = props;
        this.mapper = mapper;
        this.bootstrap();
        try {
            this.loadStorage();
        } catch (Exception e) {
            logger.error("Não foi possível carregar os dados do arquivos.");
            logger.error(e.getMessage());
        }
        logger.info("Produtos paroquia created!");
    }

    public ProdutosParoquia save(final ProdutosParoquia produtosparoquia) throws IOException {
        if (Objects.isNull(produtosparoquia.getCodCliente())) {
            produtosparoquia.setCodCliente(this.data.keySet().stream().max(Long::compareTo).orElse(0L) + 1L);
        }
        this.data.put(produtosparoquia.getCodCliente(), produtosparoquia);
        this.saveStorage();
        return produtosparoquia;
    }

    public void remove(final Long id) throws IOException {
        this.data.remove(id);
        this.saveStorage();
    }

    public Collection<ProdutosParoquia> findAll() {
        return this.data.values();
    }

    public ProdutosParoquia findById(final Long id) {
        return this.data.getOrDefault(id, null);
    }

    private void loadStorage() throws IOException {
        File s = storage.toFile();
        if (!s.exists()) {
            data = new HashMap<>();
            return;
        }
        File[] files = s.listFiles();
        if (Objects.isNull(files)) {
            return;
        }

        data = new HashMap<>();
        for (final File file : files) {
            ProdutosParoquia m = mapper.readValue(file, ProdutosParoquia.class);
            data.put(m.getCodCliente(), m);
        }

    }

    private void bootstrap() {
        this.storage = Paths.get(props.getPath() + File.separator + props.getFolder());
    }

    private void saveStorage() throws IOException {
        File storeFolder = storage.toFile();
        if (storeFolder.exists()) {
            File[] files = storeFolder.listFiles();
            if (!Objects.isNull(files)) {
                for (final File file : files) {
                    Files.delete(file.toPath());
                }
            }
        } else {
            if (!storeFolder.mkdirs()) {
                throw new IOException("Não foi possível criar as pastas!");
            }
        }

        for (final Map.Entry<Long, ProdutosParoquia> entry : data.entrySet()) {
            File f = storage.resolve(String.valueOf(entry.getKey())).toFile();
            if (f.createNewFile()) {
                mapper.writeValue(f, entry.getValue());
            }
        }
    }
}
