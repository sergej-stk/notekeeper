package com.example.notekeeper.validation;

import java.lang.reflect.Constructor;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.google.protobuf.Message;

import io.envoyproxy.pgv.ValidatorIndex;

@Aspect
@Component
public class GrpcValidator {


    public GrpcValidator() {
        
    }

    @Around("@annotation(com.example.notekeeper.validation.GrpcValidation)")
    public Object validate(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        GrpcValidation GrpcValidation = ((MethodSignature) proceedingJoinPoint.getSignature()).getMethod().getAnnotation(GrpcValidation.class);
        Constructor<?> validatorClassConstructor = GrpcValidation.validatorClass().getConstructor();
        //Constructor<?> bodyClass = GrpcValidation.bodyClass().getConstructor();
        //Class<?> cl = (Class<?>) ((ParameterizedType) bodyClass.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        io.envoyproxy.pgv.ValidatorImpl<Object> validator = (io.envoyproxy.pgv.ValidatorImpl<Object>) validatorClassConstructor.newInstance();
        //System.out.println(proceedingJoinPoint.proceed());
//Object result;
   
            final var args = proceedingJoinPoint.getArgs();
            try {
            for (Object param : args) {
                
                if (param instanceof Message message) {
                    validator.assertValid(param, ValidatorIndex.ALWAYS_VALID);
                }
            }
            
           
            return proceedingJoinPoint.proceed(args);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }

    }
}