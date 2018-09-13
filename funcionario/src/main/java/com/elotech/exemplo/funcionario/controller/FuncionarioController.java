package com.elotech.exemplo.funcionario.controller;

import com.elotech.exemplo.funcionario.model.Funcionario;
import com.elotech.exemplo.funcionario.repository.FuncionarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class FuncionarioController {

    public static final Logger logger = LoggerFactory.getLogger(FuncionarioController.class);

    public FuncionarioController(FuncionarioRepository funcionarioRepository) {

        this.funcionarioRepository = funcionarioRepository;
    }
    private final FuncionarioRepository funcionarioRepository;

    @RequestMapping("/")
    public String welcome() {
        return "Primeiro exemplo de Spring Boot + ReactJS";
    }

    @CrossOrigin
    @RequestMapping("/funcionario")
    public @ResponseBody List<Funcionario> getFuncionario(){
       return StreamSupport.stream(funcionarioRepository.findAll().spliterator(), false) .collect(Collectors.toList());
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value = "/addfuncionario")
    public ResponseEntity adicionarFuncionario(@RequestBody Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.DELETE, value = "/delfuncionario/{id}")
    public ResponseEntity deletarFuncionario(@PathVariable("id") long id){
        logger.info("Fetching & Deleting User with id {}", id);

        funcionarioRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }




}
