package com.tasteshopping.categories.repository;

import com.tasteshopping.categories.dto.BigCategoryDto;
import com.tasteshopping.categories.entity.BigCategories;
import com.tasteshopping.categories.entity.SmallCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BigCategoryRepository extends JpaRepository<BigCategories,Integer> {
    public Optional<BigCategories> findByUid(int id);
}
