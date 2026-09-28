package com.eventbooking.eventbooking.controller;
import com.eventbooking.eventbooking.entity.User;
import com.eventbooking.eventbooking.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins ="*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User savedUser =userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }
    @PostMapping("/login")
    public ResponseEntity<User>loginUser(@RequestParam String email,@RequestParam String password){
        User user =userService.loginUser(email,password);

        if(user != null){
           return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
    }


}
