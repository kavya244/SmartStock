package com.smartstock.smartstock.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartstock.smartstock.entity.Product;
import com.smartstock.smartstock.repository.ProductRepository;

@Service
public class ProductService {
	private final ProductRepository productRepository;
	ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	public Product addProduct(Product product) {
	    return productRepository.save(product);
	}
	
	public Product updateProduct(Long id, Product product) {
	    Product existingProduct = productRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Product not found"));

	    existingProduct.setPname(product.getPname());
	    existingProduct.setPrice(product.getPrice());
	    existingProduct.setQuantity(product.getQuantity());

	    return productRepository.save(existingProduct);
	}
	
	public void deleteProduct(Long id) {
	    productRepository.deleteById(id);
	}
}
