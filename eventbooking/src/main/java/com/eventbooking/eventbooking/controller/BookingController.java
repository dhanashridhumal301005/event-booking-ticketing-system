package com.eventbooking.eventbooking.controller;

import com.eventbooking.eventbooking.entity.Booking;
import com.eventbooking.eventbooking.service.BookingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/book")
    public Booking bookTickets(@RequestBody Booking booking) {
        return bookingService.bookTickets(booking);
    }
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingHistory(@PathVariable Long userId) {

        return bookingService.getBookingHistory(userId);

    }
    @DeleteMapping("/{bookingId}")
    public String cancelBooking(@PathVariable Long bookingId) {

        bookingService.cancelBooking(bookingId);

        return "Booking cancelled successfully";
    }
}