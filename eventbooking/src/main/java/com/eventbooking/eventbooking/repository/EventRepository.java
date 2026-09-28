package com.eventbooking.eventbooking.repository;
import com.eventbooking.eventbooking.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event,Long> {
}
