package com.sprint.challenge.repository;

import com.sprint.challenge.model.Deteccao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeteccaoRepository extends JpaRepository<Deteccao, Long> {
}