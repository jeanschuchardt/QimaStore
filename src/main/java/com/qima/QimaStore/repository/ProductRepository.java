package com.qima.QimaStore.repository;


import com.qima.QimaStore.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Adicione métodos de consulta personalizados aqui, se necessário
}

