package com.example.notekeeper.validation;

import java.lang.reflect.Constructor;
import java.lang.reflect.ParameterizedType;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.data.domain.Auditable;
import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.stereotype.Component;

import com.google.protobuf.Message;

import build.buf.protovalidate.ValidationResult;
import build.buf.protovalidate.Validator;
import build.buf.protovalidate.exceptions.ValidationException;
import io.envoyproxy.pgv.ValidatorIndex;
import pb.AuthService.LoginRequest;

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
          Object result;
        try {
            final var args = proceedingJoinPoint.getArgs();
            
            for (Object param : args) {
                
                if (param instanceof Message message) {
                    validator.assertValid(param, ValidatorIndex.ALWAYS_VALID);
                }
            }
            result = proceedingJoinPoint.proceed(args);
        } catch (ValidationException e) {
            throw new GrpcValidationException(e.getMessage(), e);
        }

        return result;
    }
}