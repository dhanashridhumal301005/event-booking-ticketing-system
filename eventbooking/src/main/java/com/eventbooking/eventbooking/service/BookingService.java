package com.eventbooking.eventbooking.service;

import com.eventbooking.eventbooking.entity.Booking;
import com.eventbooking.eventbooking.entity.Event;
import com.eventbooking.eventbooking.repository.BookingRepository;
import com.eventbooking.eventbooking.repository.EventRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    public BookingService(BookingRepository bookingRepository,
                          EventRepository eventRepository) {

        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    public Booking bookTickets(Booking booking) {

        Event event = eventRepository.findById(booking.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (booking.getNumberOfTickets() <= 0) {
            throw new RuntimeException("Number of tickets must be greater than 0");
        }

        if (booking.getNumberOfTickets() > event.getAvailableTickets()) {
            throw new RuntimeException("Not enough tickets available");
        }

        double totalPrice =
                booking.getNumberOfTickets() * event.getPrice();

        booking.setTotalPrice(totalPrice);

        int remainingTickets =
                event.getAvailableTickets() - booking.getNumberOfTickets();

        event.setAvailableTickets(remainingTickets);

        eventRepository.save(event);

        return bookingRepository.save(booking);
    }
    public List<Booking> getBookingHistory(Long userId) {

        return bookingRepository.findByUserId(userId);

    }
    public void cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Event event = eventRepository.findById(booking.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        int updatedTickets =
                event.getAvailableTickets() + booking.getNumberOfTickets();

        event.setAvailableTickets(updatedTickets);

        eventRepository.save(event);

        bookingRepository.deleteById(bookingId);
    }
}