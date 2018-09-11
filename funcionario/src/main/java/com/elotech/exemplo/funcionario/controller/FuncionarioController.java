package com.elotech.exemplo.funcionario.controller;

import com.elotech.exemplo.funcionario.model.Funcionario;
import com.elotech.exemplo.funcionario.repository.FuncionarioRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
        return "Welcome to Spring Boot Tutorials";
    }

    @RequestMapping("/funcionario")
    public @ResponseBody List<Funcionario> getFuncionario(){
       return StreamSupport.stream(funcionarioRepository.findAll().spliterator(), false) .collect(Collectors.toList());
    }


    @RequestMapping("/hello")
    public String myData() {
        return "Hello Spring Boot";
    }

}
