package at.fhjoanneum.softarch.greetingservice.greeting;

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

    @GetMapping(value = "/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(OK)
    public ResponseEntity<String> sayHello(@PathVariable("name") String name) {
        return ResponseEntity.ok("{\"greeting\":\"Hello "+name+"\"}");
    }

}
