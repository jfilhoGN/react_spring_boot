package com.elotech.exemplo.funcionario.repository;

import com.elotech.exemplo.funcionario.model.Funcionario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends CrudRepository<Funcionario,Long> {


}
