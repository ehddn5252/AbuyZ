package com.tasteshopping.inquiry.repository;

import com.tasteshopping.inquiry.entity.CustomerCenters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerCenterRepository extends JpaRepository<CustomerCenters,Integer> {
    @Query(value="select c from CustomerCenters c where c.user.email=:email")
    List<Optional<CustomerCenters>> findByUserEmail(String email);

    List<CustomerCenters> findByStatus(String status);

    @Query(value = "select c from CustomerCenters c Order by date desc")
    List<CustomerCenters> orderByDate();
}
