package com.tasteshopping.inquiry.repository;

import com.tasteshopping.inquiry.entity.CustomerCenters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerCenterRepository extends JpaRepository<CustomerCenters,Integer> {
    @Query(value="select c from CustomerCenters c " +
            "left join Orders o on c.order = o " +
            "left join Inventories i on o.inventory = i " +
            "left join Products p on i.product=p " +
            "left join Users u on c.user = u " +
            "where c.user.email=:email")
    List<Optional<CustomerCenters>> findByUserEmail(String email);

//    @Query(value="select c from CustomerCenters c where c.user.email=:email ")
//    List<Optional<CustomerCenters>> findByUserEmail(String email);

    @Query(value ="select c from CustomerCenters c " +
            "left join Orders o on c.order = o " +
            "left join Inventories i on o.inventory = i " +
            "left join Users u on c.user= u " +
            "left join Products p on i.product=p")
    List<CustomerCenters> findAllFetchJoin();

    @Query(value="select c from CustomerCenters c where c.user.email=:email and c.reply is null")
    List<Optional<CustomerCenters>> findByUserEmailAndNoReply(String email);


    List<CustomerCenters> findByStatus(String status);

    @Query(value = "select c from CustomerCenters c where c.reply is null Order by c.start_date desc  ")
    List<CustomerCenters> orderByDate();
}
