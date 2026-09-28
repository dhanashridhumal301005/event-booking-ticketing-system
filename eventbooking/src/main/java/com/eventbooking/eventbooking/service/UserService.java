package com.eventbooking.eventbooking.service;
import  com.eventbooking.eventbooking.entity.User;
import com.eventbooking.eventbooking.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    public User registerUser(User user){
        return userRepository.save(user);
    }
    public User loginUser(String email,String password){
        User user =userRepository.findByEmail(email);
        if(user !=null && user.getPassword().equals(password)){
            return user;
        }
        return null;
    }

}
