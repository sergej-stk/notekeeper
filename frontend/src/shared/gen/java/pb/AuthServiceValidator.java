// Code generated by protoc-gen-validate. DO NOT EDIT.
// source: proto/auth_service.proto

package pb;


@SuppressWarnings("all")
public class AuthServiceValidator {
	public static io.envoyproxy.pgv.ValidatorImpl validatorFor(Class clazz) {
		
		if (clazz.equals(pb.AuthService.LoginRequest.class)) return new LoginRequestValidator();
		if (clazz.equals(pb.AuthService.LoginResponse.class)) return new LoginResponseValidator();
		if (clazz.equals(pb.AuthService.RegisterRequest.class)) return new RegisterRequestValidator();
		return null;
	}


/**
	 * Validates {@code LoginRequest} protobuf objects.
	 */
	public static class LoginRequestValidator implements io.envoyproxy.pgv.ValidatorImpl<pb.AuthService.LoginRequest> {
		
	
		
	
	
	

	public void assertValid(pb.AuthService.LoginRequest proto, io.envoyproxy.pgv.ValidatorIndex index) throws io.envoyproxy.pgv.ValidationException {
	
			io.envoyproxy.pgv.StringValidation.email(".pb.LoginRequest.username", proto.getUsername());
	// no validation rules for Password

	
	
	}
}
/**
	 * Validates {@code LoginResponse} protobuf objects.
	 */
	public static class LoginResponseValidator implements io.envoyproxy.pgv.ValidatorImpl<pb.AuthService.LoginResponse> {
		
	
	
	

	public void assertValid(pb.AuthService.LoginResponse proto, io.envoyproxy.pgv.ValidatorIndex index) throws io.envoyproxy.pgv.ValidationException {
	// no validation rules for Token

	
	
	}
}
/**
	 * Validates {@code RegisterRequest} protobuf objects.
	 */
	public static class RegisterRequestValidator implements io.envoyproxy.pgv.ValidatorImpl<pb.AuthService.RegisterRequest> {
		
	
		
	
		
	
	
	

	public void assertValid(pb.AuthService.RegisterRequest proto, io.envoyproxy.pgv.ValidatorIndex index) throws io.envoyproxy.pgv.ValidationException {
	
			io.envoyproxy.pgv.StringValidation.email(".pb.RegisterRequest.username", proto.getUsername());
	// no validation rules for Password

	// no validation rules for FullName

	
	
	}
}
}
