package com.example.iotserver.controller;

import com.example.iotserver.entity.Esp;
import com.example.iotserver.repository.EspRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author nonlinearthink
 */
@RestController
@RequestMapping("/esp")
public class EspController {
    private final EspRepository espRepository;
    @Autowired
    public EspController(EspRepository espRepository) {
        this.espRepository = espRepository;
    }

    @GetMapping("")
    public List<Esp> getData(){
        return espRepository.findAll();
    }

    @PostMapping("")
    public void setData(@RequestBody Esp esp){
        espRepository.save(esp);
    }
}
