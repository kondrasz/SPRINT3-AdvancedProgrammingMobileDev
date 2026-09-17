package com.sprint.challenge.controller;

import com.sprint.challenge.model.Deteccao;
import com.sprint.challenge.service.DeteccaoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/deteccoes")
@CrossOrigin
public class DeteccaoController {

    private final DeteccaoService service;

    public DeteccaoController(DeteccaoService service) {
        this.service = service;
    }

    @PostMapping
    public Deteccao criar(@RequestBody Deteccao deteccao) {
        return service.salvar(deteccao);
    }

    @GetMapping
    public List<Deteccao> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Deteccao buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Deteccao atualizar(@PathVariable Long id, @RequestBody Deteccao deteccao) {
        return service.atualizar(id, deteccao);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}