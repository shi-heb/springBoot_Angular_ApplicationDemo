package com.sid.catalogservice;

import com.sid.catalogservice.dao.ProduitRepository;
import com.sid.catalogservice.entities.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import sun.tools.jar.CommandLine;

@SpringBootApplication
public class CatalogServiceApplication implements CommandLineRunner {

    @Autowired
    private ProduitRepository produitRepository;

    public static void main(String[] args) {
        SpringApplication.run(CatalogServiceApplication.class, args);
    }

    //Pour exposer id au json
    @Autowired
    private RepositoryRestConfiguration restConfiguration;

    @Override
    public void run(String... args ) throws Exception {
        restConfiguration.exposeIdsFor(Produit.class);
        produitRepository.save(new Produit(null,"Ordinateur thinkpad",1400,2));
        produitRepository.save(new Produit(null,"Ordinateur acer",1000,4));
        produitRepository.save(new Produit(null,"Galaxy s9",2500,3));

        produitRepository.findAll().forEach(p -> {
            System.out.println(p.toString());
        });

    }
}
