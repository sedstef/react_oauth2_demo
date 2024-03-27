package com.example.resourceserver.greeting;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/hello")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class HelloBoundary {

    @GetMapping(produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseStatus(OK)
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello World");
    }

}
