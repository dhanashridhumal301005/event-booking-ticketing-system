package com.eventbooking.eventbooking.repository;
import com.eventbooking.eventbooking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String Email);

}
