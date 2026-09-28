package com.eventbooking.eventbooking.entity;
import jakarta.persistence.*;

@Entity
@Table(name="events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  String name;
    private String location;
    private String date;
    private Double price;
    private int availableTickets;

    public Event(){

    }
    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this .id=id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getLocation(){
        return location;
    }
    public void setLocation(String location){
        this .location=location;

    }
    public  String getDate(){
        return date;
    }
    public void setDate(String date){
        this.date=date;
    }
    public double getPrice(){
        return price;
    }
    public void setPrice(double price){
        this.price=price;
    }
    public int getAvailableTickets(){
        return availableTickets;
    }

    public void setAvailableTickets(int availableTickets) {
        this.availableTickets = availableTickets;
    }
}
