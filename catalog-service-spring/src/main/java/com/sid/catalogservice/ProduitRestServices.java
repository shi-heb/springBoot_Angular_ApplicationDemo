package com.sid.catalogservice;

import com.sid.catalogservice.dao.ProduitRepository;
import com.sid.catalogservice.entities.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
public class ProduitRestServices  {
    @Autowired
    private ProduitRepository produitRepository;
    @GetMapping(value = "/listproduits")
    public List<Produit> listProduits(){
            return produitRepository.findAll();
        }
    @GetMapping(value = "/listproduits/{id}")
    public Produit listProduits(@PathVariable(name = "id") Long id){
        return produitRepository.findById(id).get();
    }
    @PutMapping(value = "/listproduits/{id}")
    public Produit update(@PathVariable(name = "id") Long id, @RequestBody Produit p){
        p.setId(id);
        return produitRepository.save(p);
    }
    @PostMapping(value = "/listproduits")
    public Produit save(@RequestBody Produit p){
        return produitRepository.save(p);
    }
    @DeleteMapping(value = "/listproduits/{id}")
    public void delete(@PathVariable(name = "id") Long id){
        produitRepository.deleteById(id);
    }
}
