package com.eventbooking.eventbooking.service;
import com.eventbooking.eventbooking.entity.Event;
import com.eventbooking.eventbooking.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository){
        this .eventRepository=eventRepository;
    }
    public Event addEvent(Event event){
        return eventRepository.save(event);
    }
    public List<Event>getAllEvents(){
        return eventRepository.findAll();
    }
    public Event updateEvent(Long id,Event event){
        Event existingEvent=eventRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Event not found"));
        existingEvent.setName(event.getName());
        existingEvent.setLocation(event.getLocation());
        existingEvent.setDate(event.getDate());
        existingEvent.setPrice(event.getPrice());
        existingEvent.setAvailableTickets(event.getAvailableTickets());

        return eventRepository.save(existingEvent);
    }
    public void deleteEvent(Long id){

        eventRepository.deleteById(id);

    }
}
