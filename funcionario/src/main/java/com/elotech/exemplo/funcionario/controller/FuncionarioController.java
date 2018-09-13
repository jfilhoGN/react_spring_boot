package com.elotech.exemplo.funcionario.controller;

import com.elotech.exemplo.funcionario.model.Funcionario;
import com.elotech.exemplo.funcionario.repository.FuncionarioRepository;
import jdk.nashorn.internal.parser.JSONParser;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
public class FuncionarioController {

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


}
