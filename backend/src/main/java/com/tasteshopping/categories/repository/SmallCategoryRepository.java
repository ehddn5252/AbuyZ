package com.tasteshopping.categories.repository;

import com.tasteshopping.categories.entity.SmallCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SmallCategoryRepository extends JpaRepository<SmallCategories,Integer> {
    public Optional<SmallCategories> findByUid(int id);
}
