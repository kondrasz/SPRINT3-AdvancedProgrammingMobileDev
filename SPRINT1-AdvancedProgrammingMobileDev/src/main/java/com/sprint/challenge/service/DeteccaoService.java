package com.sprint.challenge.service;

import com.sprint.challenge.model.Deteccao;
import com.sprint.challenge.repository.DeteccaoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DeteccaoService {

    private final DeteccaoRepository repository;

    public DeteccaoService(DeteccaoRepository repository) {
        this.repository = repository;
    }

    public Deteccao salvar(Deteccao deteccao) {
        return repository.save(deteccao);
    }

    public List<Deteccao> listar() {
        return repository.findAll();
    }

    public Deteccao buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detecção não encontrada"));
    }

    public Deteccao atualizar(Long id, Deteccao atualizada) {
        Deteccao existente = buscarPorId(id);
        existente.setEquipamento(atualizada.getEquipamento());
        existente.setEmUso(atualizada.getEmUso());
        existente.setSetor(atualizada.getSetor());
        existente.setDataHora(atualizada.getDataHora());
        return repository.save(existente);
    }

    public void deletar(Long id) {
        Deteccao deteccao = buscarPorId(id);
        repository.delete(deteccao);
    }
}