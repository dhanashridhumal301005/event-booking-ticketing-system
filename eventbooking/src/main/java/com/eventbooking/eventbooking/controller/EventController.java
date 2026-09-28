package com.eventbooking.eventbooking.controller;

import com.eventbooking.eventbooking.entity.Event;
import com.eventbooking.eventbooking.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")

public class EventController {
    private final EventService eventService;
    public EventController(EventService eventService){
        this .eventService=eventService;
    }
    @PostMapping("/add")
    public Event addEvent (@RequestBody Event event){
        return eventService.addEvent(event);
    }
    @GetMapping
    public List<Event>getAllEvents(){
        return eventService.getAllEvents();
    }
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event){
        return eventService.updateEvent(id, event);
    }
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id){

        eventService.deleteEvent(id);

        return "Event deleted successfully";

    }

}
