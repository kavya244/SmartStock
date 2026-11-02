package com.smartstock.smartstock.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartstock.smartstock.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
